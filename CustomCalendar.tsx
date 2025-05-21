import React, { useState, useRef, MouseEvent } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Popover,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// ──────────── Styled Components ────────────

const Container = styled(Paper)({
  display: "flex",
  width: 520,
  height: 562,
  overflow: "hidden",
  border: "1px solid #ccc",
});

const Sidebar = styled(Box)({
  width: 176,
  backgroundColor: "#fff",
  borderRight: "1px solid #ddd",
});

const Main = styled(Box)({
  flex: 1,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const Footer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
  marginTop: 16,
});

const StyledTextField = styled(TextField)({
  width: "100%",
  marginBottom: 10,
  "& .MuiInputBase-root": {
    height: 36,
    padding: "1px 12px",
    fontSize: 15,
    borderRadius: 0,
  },
  "& input": {
    padding: 0,
    fontSize: 15,
    "&::placeholder": {
      fontSize: 13,
      color: "#999",
    },
  },
});

const StyledLabel = styled("label")({
  display: "block",
  fontSize: 13,
  marginBottom: 6,
  color: "#646464",
});

// ──────────── Types ────────────

interface DateRange {
  startDate: Dayjs;
  endDate: Dayjs;
}

interface PresetOption {
  label: string;
  range?: DateRange;
}

type PresetOptions = Record<string, PresetOption>;

// ──────────── Presets ────────────

const getPresets = (): PresetOptions => {
  const today = dayjs();
  const currentYear = today.year();
  const currentMonth = today.month();

  const startOfMonth = dayjs(new Date(currentYear, currentMonth, 1));
  const startOfLastMonth = dayjs(new Date(currentYear, currentMonth - 1, 1));
  const endOfLastMonth = dayjs(new Date(currentYear, currentMonth, 0));
  const startOfQuarter = dayjs(new Date(currentYear, Math.floor(currentMonth / 3) * 3, 1));
  const startOfYear = dayjs(new Date(currentYear, 0, 1));
  const startOfLastYear = dayjs(new Date(currentYear - 1, 0, 1));
  const endOfLastYear = dayjs(new Date(currentYear - 1, 11, 31));

  return {
    thisMonth: {
      label: "This Month",
      range: { startDate: startOfMonth, endDate: today },
    },
    lastMonth: {
      label: "Last Month",
      range: { startDate: startOfLastMonth, endDate: endOfLastMonth },
    },
    quarterToDate: {
      label: "Quarter To Date",
      range: { startDate: startOfQuarter, endDate: today },
    },
    yearToDate: {
      label: "Year To Date",
      range: { startDate: startOfYear, endDate: today },
    },
    lastYear: {
      label: "Last Year",
      range: { startDate: startOfLastYear, endDate: endOfLastYear },
    },
    customDates: { label: "Custom Dates" },
  };
};

// ──────────── Main Component ────────────

export default function CustomCalendar() {
  const presetOptions = getPresets();

  // State
  const [selectedOption, setSelectedOption] = useState<keyof typeof presetOptions>("customDates");
  const [range, setRange] = useState<DateRange>({
    startDate: dayjs(),
    endDate: dayjs(),
  });
  const [customDates, setCustomDates] = useState<Dayjs[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const open = Boolean(anchorEl);

  // Handlers
  const handleOpenCalendar = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleCloseCalendar = () => setAnchorEl(null);

  const handleOptionClick = (key: keyof typeof presetOptions) => {
    setSelectedOption(key);
    if (presetOptions[key].range) {
      setRange(presetOptions[key].range);
      setCustomDates([]);
    } else {
      setCustomDates([]);
    }
  };

  const handleDateClick = (date: Dayjs | null) => {
    if (!date || selectedOption !== "customDates") return;

    setCustomDates((prev) =>
      prev.some((d) => d.isSame(date, "day"))
        ? prev.filter((d) => !d.isSame(date, "day"))
        : [...prev, date]
    );
  };

  const handleApply = () => {
    if (selectedOption === "customDates") {
      console.log(
        "Selected Dates:",
        customDates
          .slice()
          .sort((a, b) => a.unix() - b.unix())
          .map((d) => d.format("MM/DD/YYYY"))
          .join(", ")
      );
    } else {
      console.log(
        "Range:",
        range.startDate.format("MM/DD/YYYY"),
        "-",
        range.endDate.format("MM/DD/YYYY")
      );
    }
    handleCloseCalendar();
  };

  // Render the date fields based on selection
  const renderFields = () => {
    if (selectedOption === "customDates") {
      return (
        <>
          <StyledLabel>Selected Dates</StyledLabel>
          <Typography variant="body2" color="textSecondary" sx={{ minHeight: 24 }}>
            {customDates.length > 0
              ? customDates
                  .slice()
                  .sort((a, b) => a.unix() - b.unix())
                  .map((d) => d.format("MM/DD/YYYY"))
                  .join(", ")
              : "None"}
          </Typography>
        </>
      );
    }

    return (
      <>
        <StyledLabel>From</StyledLabel>
        <StyledTextField
          value={range.startDate.format("MM/DD/YYYY")}
          size="small"
          InputProps={{ readOnly: true }}
        />
        <StyledLabel>To</StyledLabel>
        <StyledTextField
          value={range.endDate.format("MM/DD/YYYY")}
          size="small"
          InputProps={{ readOnly: true }}
        />
      </>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ mb: 1 }}>
        <TextField
          placeholder="MM/DD/YYYY-MM/DD/YYYY"
          inputRef={inputRef}
          onClick={handleOpenCalendar}
          value={
            selectedOption === "customDates"
              ? customDates
                  .slice()
                  .sort((a, b) => a.unix() - b.unix())
                  .map((d) => d.format("MM/DD/YYYY"))
                  .join(", ")
              : `${range.startDate.format("MM/DD/YYYY")} - ${range.endDate.format("MM/DD/YYYY")}`
          }
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleOpenCalendar}>
                  <CalendarMonthIcon />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              height: 36,
              padding: "1px 12px",
              fontSize: 15,
              borderRadius: 0,
            },
          }}
          inputProps={{
            sx: {
              fontSize: 15,
              "&::placeholder": {
                fontSize: 13,
                color: "#1c1c1c",
              },
            },
          }}
          sx={{
            width: 250,
            height: 36,
            mb: 1,
            cursor: "pointer",
          }}
        />
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseCalendar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{ sx: { overflow: "hidden" } }}
      >
        <Container>
          <Sidebar>
            <List dense disablePadding>
              {Object.entries(presetOptions).map(([key, { label }]) => (
                <ListItemButton
                  key={key}
                  selected={selectedOption === key}
                  onClick={() => handleOptionClick(key as keyof typeof presetOptions)}
                  sx={{
                    px: 2,
                    height: 48,
                    fontSize: 15,
                    "&.Mui-selected": { backgroundColor: "#d3eaf3" },
                  }}
                >
                  <ListItemText primary={label} />
                </ListItemButton>
              ))}
            </List>
          </Sidebar>

          <Main>
            <Box>
              {renderFields()}

              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={null}
                onChange={handleDateClick}
                sx={{ width: 318, height: 300, p: 0 }}
                slotProps={{
                  day: {
                    sx: { width: 36, height: 36, fontSize: 14 },
                    selected: (day: Dayjs) => {
                      if (selectedOption === "customDates") {
                        return customDates.some((d) => d.isSame(day, "day"));
                      }
                      return (
                        day.isSame(range.startDate, "day") ||
                        day.isSame(range.endDate, "day") ||
                        (day.isAfter(range.startDate, "day") && day.isBefore(range.endDate, "day"))
                      );
                    },
                    onClick: (e: MouseEvent<HTMLElement>, day: Dayjs) => handleDateClick(day),
                  },
                }}
                showDaysOutsideCurrentMonth
                disableHighlightToday={false}
              />
            </Box>

            <Footer>
              <Button onClick={handleCloseCalendar} variant="outlined" size="small">
                Cancel
              </Button>
              <Button onClick={handleApply} variant="contained" size="small">
                Apply
              </Button>
            </Footer>
          </Main>
        </Container>
      </Popover>
    </LocalizationProvider>
  );
}
