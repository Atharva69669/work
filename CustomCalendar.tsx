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
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";

// ──────────── Types ────────────
type PresetKey =
  | "today"
  | "thisMonth"
  | "lastMonth"
  | "quarterToDate"
  | "yearToDate"
  | "lastYear"
  | "customDates";

type Preset = {
  label: string;
  range?: {
    startDate: Dayjs;
    endDate: Dayjs;
  };
};

type Presets = Record<PresetKey, Preset>;

// ──────────── Styled Components ────────────

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
  marginBottom: 6,
  color: "#646464",
});

// ──────────── Presets using Native JS Dates ────────────

function getPresets(): Presets {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const startOfMonth = new Date(currentYear, currentMonth, 1);
  const startOfLastMonth = new Date(currentYear, currentMonth - 1, 1);
  const endOfLastMonth = new Date(currentYear, currentMonth, 0);
  const startOfQuarter = new Date(currentYear, Math.floor(currentMonth / 3) * 3, 1);
  const startOfYear = new Date(currentYear, 0, 1);
  const startOfLastYear = new Date(currentYear - 1, 0, 1);
  const endOfLastYear = new Date(currentYear - 1, 11, 31);

  return {
    today: {
      label: "Today",
      range: {
        startDate: dayjs(today),
        endDate: dayjs(today),
      },
    },
    thisMonth: {
      label: "This Month",
      range: {
        startDate: dayjs(startOfMonth),
        endDate: dayjs(today),
      },
    },
    lastMonth: {
      label: "Last Month",
      range: {
        startDate: dayjs(startOfLastMonth),
        endDate: dayjs(endOfLastMonth),
      },
    },
    quarterToDate: {
      label: "Quarter To Date",
      range: {
        startDate: dayjs(startOfQuarter),
        endDate: dayjs(today),
      },
    },
    yearToDate: {
      label: "Year To Date",
      range: {
        startDate: dayjs(startOfYear),
        endDate: dayjs(today),
      },
    },
    lastYear: {
      label: "Last Year",
      range: {
        startDate: dayjs(startOfLastYear),
        endDate: dayjs(endOfLastYear),
      },
    },
    customDates: {
      label: "Custom Dates",
    },
  };
}

// ──────────── Main Component ────────────

export default function CustomCalendar(): JSX.Element {
  const presetOptions = getPresets();
  const [selectedOption, setSelectedOption] = useState<PresetKey>("customDates");
  const [range, setRange] = useState<{ startDate: Dayjs; endDate: Dayjs }>({
    startDate: dayjs(),
    endDate: dayjs(),
  });
  const [customDates, setCustomDates] = useState<Dayjs[]>([]);

  const handleOptionClick = (key: PresetKey): void => {
    setSelectedOption(key);
    if (presetOptions[key].range) {
      setRange(presetOptions[key].range!);
    } else {
      setCustomDates([]);
    }
  };

  const handleDateClick = (date: Dayjs | null): void => {
    if (!date || selectedOption !== "customDates") return;

    const exists = customDates.some((d) => d.isSame(date, "day"));
    if (exists) {
      setCustomDates(customDates.filter((d) => !d.isSame(date, "day")));
    } else {
      setCustomDates([...customDates, date]);
    }
  };

  const handleApply = (): void => {
    if (selectedOption === "customDates") {
      console.log(
        "Selected Dates:",
        customDates.map((d) => d.format("MM/DD/YYYY")).join(", ")
      );
    } else {
      console.log(
        "Range:",
        range.startDate.format("MM/DD/YYYY"),
        "-",
        range.endDate.format("MM/DD/YYYY")
      );
    }
  };

  const renderFields = () => {
    if (selectedOption === "customDates") {
      return (
        <>
          <StyledLabel>Selected Dates</StyledLabel>
          <Typography variant="body2" color="textSecondary">
            {customDates.length > 0
              ? customDates
                  .sort((a, b) => a.unix() - b.unix())
                  .map((d) => d.format("MM/DD/YYYY"))
                  .join(", ")
              : "None"}
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <StyledLabel>From</StyledLabel>
          <StyledTextField
            value={range.startDate.format("MM/DD/YYYY")}
            size="small"
            disabled
          />
          <StyledLabel>To</StyledLabel>
          <StyledTextField
            value={range.endDate.format("MM/DD/YYYY")}
            size="small"
            disabled
          />
        </>
      );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            {renderFields()}
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={null}
              onChange={handleDateClick}
              slotProps={{
                day: {
                  selected: (day: Dayjs) =>
                    selectedOption === "customDates" &&
                    customDates.some((d) => d.isSame(day, "day")),
                },
              }}
            />
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
    </LocalizationProvider>
  );
}
