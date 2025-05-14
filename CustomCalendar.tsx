import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import { Calendar } from "react-date-range";
import {
  format,
  startOfMonth,
  endOfMonth,
  subMonths,
  startOfQuarter,
  startOfYear,
  endOfYear,
  isSameDay,
  parse,
} from "date-fns";
import { styled } from "@mui/material/styles";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// ──────────────────────── Types ──────────────────────────

type PresetKey =
  | "thisMonth"
  | "today"
  | "lastMonth"
  | "quarterToDate"
  | "yearToDate"
  | "lastYear"
  | "customDates";

interface DateRange {
  startDate: Date;
  endDate: Date;
}

// ──────────────────────── Styled Components ──────────────────────────

const Container = styled(Paper)({
  display: "flex",
  width: 500,
  height: 600,
  overflow: "hidden",
  border: "1px solid #ccc",
});

const Sidebar = styled(Box)({
  width: 176,
  backgroundColor: "#FFFFFF",
  borderRight: "1px solid #ddd",
});

const Main = styled(Box)({
  flex: 1,
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const Footer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
  marginTop: 2,
});

const StyledTextField = styled(TextField)({
  width: 276,
  height: 36,
  "& .MuiInputBase-root": {
    height: 36,
    padding: "1px 12px",
    fontSize: 15,
  },
  "& input::placeholder": {
    fontSize: 13,
  },
});

const StyledLabel = styled("label")({
  display: "block",
  fontSize: 13,
  fontFamily: "'Frutiger 55 Roman', sans-serif",
  marginBottom: 6,
  color: "#646464",
});

const calendarStyles = {
  "& .rdrMonthAndYearWrapper": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 1,
    padding: "0 4px",
  },
  "& .rdrMonthAndYearPickers": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  "& .rdrMonthAndYearPickers select": {
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    backgroundImage: "none",
    backgroundColor: "transparent",
    border: "none",
    fontWeight: "normal",
    fontSize: 14,
    padding: "2px 4px",
    outline: "none",
    cursor: "pointer",
  },
  "& .rdrNextPrevButton": {
    margin: "0 2px",
    padding: "2px",
    fontSize: 13,
    background: "transparent",
    border: "none",
    color: "#555",
  },
};

// ────────────────────────── Presets ──────────────────────────

const presetOptions: Record<
  PresetKey,
  { label: string; range?: DateRange }
> = {
  thisMonth: {
    label: "This Month",
    range: { startDate: startOfMonth(new Date()), endDate: new Date() },
  },
  today: {
    label: "Today",
    range: { startDate: new Date(), endDate: new Date() },
  },
  lastMonth: {
    label: "Last Month",
    range: {
      startDate: startOfMonth(subMonths(new Date(), 1)),
      endDate: endOfMonth(subMonths(new Date(), 1)),
    },
  },
  quarterToDate: {
    label: "Quarter To Date",
    range: { startDate: startOfQuarter(new Date()), endDate: new Date() },
  },
  yearToDate: {
    label: "Year To Date",
    range: { startDate: startOfYear(new Date()), endDate: new Date() },
  },
  lastYear: {
    label: "Last Year",
    range: {
      startDate: startOfYear(new Date(new Date().getFullYear() - 1, 0, 1)),
      endDate: endOfYear(new Date(new Date().getFullYear() - 1, 11, 31)),
    },
  },
  customDates: {
    label: "Custom Dates",
  },
};

// ──────────────────────── Component ──────────────────────────

export default function CustomCalendar(): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<PresetKey>("customDates");
  const [range, setRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [customDates, setCustomDates] = useState<Date[]>([]);
  const [inputDate, setInputDate] = useState<string>("");

  const handleOptionClick = (key: PresetKey) => {
    setSelectedOption(key);
    if (presetOptions[key].range) setRange(presetOptions[key].range!);
    if (key === "customDates") {
      setCustomDates([]);
      setInputDate("");
    }
  };

  const handleCalendarClick = (date: Date) => {
    if (selectedOption !== "customDates") return;
    setCustomDates((prev) =>
      prev.some((d) => isSameDay(d, date))
        ? prev.filter((d) => !isSameDay(d, date))
        : [...prev, date]
    );
  };

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputDate(value);
    const parsed = parse(value, "MM/dd/yyyy", new Date());
    if (!isNaN(parsed.getTime()) && !customDates.some((d) => isSameDay(d, parsed))) {
      setCustomDates([...customDates, parsed]);
    }
  };

  const handleApply = () => {
    if (selectedOption === "customDates") {
      console.log(
        "Selected Dates:",
        customDates.map((d) => format(d, "MM/dd/yyyy")).join(", ")
      );
    } else {
      console.log("Applied From:", range.startDate);
      console.log("Applied To:", range.endDate);
    }
  };

  const renderTextFieldDisplay = () =>
    selectedOption === "customDates" ? (
      <>
        <StyledLabel>Type Date</StyledLabel>
        <StyledTextField
          placeholder="MM/DD/YYYY"
          size="small"
          value={inputDate}
          onChange={handleDateInput}
        />
      </>
    ) : (
      <>
        <StyledLabel>From</StyledLabel>
        <StyledTextField
          value={format(range.startDate, "MM/dd/yyyy")}
          size="small"
          disabled
        />
        <StyledLabel>To</StyledLabel>
        <StyledTextField
          value={format(range.endDate, "MM/dd/yyyy")}
          size="small"
          disabled
        />
      </>
    );

  const renderSelectedDates = () =>
    selectedOption === "customDates" && (
      <>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Selected dates
        </Typography>
        <Typography variant="body1" gutterBottom>
          {customDates.length > 0
            ? customDates
                .sort((a, b) => a.getTime() - b.getTime())
                .map((d) => format(d, "MM/dd/yyyy"))
                .join(", ")
            : "None"}
        </Typography>
      </>
    );

  return (
    <Container>
      <Sidebar>
        <List dense disablePadding>
          {Object.entries(presetOptions).map(([key, { label }]) => (
            <ListItemButton
              key={key}
              selected={selectedOption === key}
              onClick={() => handleOptionClick(key as PresetKey)}
              sx={{
                px: 2,
                height: 48,
                "& .MuiListItemText-primary": { fontSize: "13px" },
                "&.Mui-selected": { backgroundColor: "#d0e0ff" },
              }}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Sidebar>

      <Main>
        <Box>
          {renderTextFieldDisplay()}
          {renderSelectedDates()}

          <Box mt={1} sx={calendarStyles}>
            <Calendar
              onChange={
                selectedOption === "customDates"
                  ? handleCalendarClick
                  : (date) =>
                      setRange({ startDate: date as Date, endDate: date as Date })
              }
              dayContentRenderer={(date) => (
                <div style={{ textAlign: "center", fontSize: "12px" }}>
                  {date.getDate()}
                </div>
              )}
              showDateDisplay={false}
              color="#d0e0ff"
              date={undefined}
            />
          </Box>
        </Box>

        <Footer>
          <Button
            variant="outlined"
            onClick={() => handleOptionClick("customDates")}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleApply}>
            Apply
          </Button>
        </Footer>
      </Main>
    </Container>
  );
}
