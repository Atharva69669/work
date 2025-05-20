import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

type Option = {
  label: string;
  value: string | number;
};

type CustomDropDownProps = {
  label?: string;
  options: Option[];
  value: string | number;
  onChange: (event: SelectChangeEvent) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  width?: string | number;
};

const StyledLabel = styled("label")({
  display: "block",
  fontSize: "13px",
  fontFamily: "'Frutiger 55 Roman', sans-serif",
  marginBottom: "6px",
  color: "#646464",
});

const StyledFormControl = styled(FormControl)<{ width?: string | number }>(({ width = "250px" }) => ({
  width,
  borderRadius: 0,
  backgroundColor: "white",
}));

const StyledSelect = styled(Select)({
  height: "36px",
  fontSize: "15px",
  fontFamily: "'Frutiger 55 Roman', sans-serif",
  border: "1px solid #646464",
  borderRadius: 0,
  "& .MuiSelect-select": {
    padding: "8px 14px",
    height: "36px",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover, &.Mui-focused": {
    backgroundColor: "white",
  },
});

const StyledMenuItem = styled(MenuItem)({
  height: "48px",
  fontSize: "15px",
  fontFamily: "'Frutiger 55 Roman', sans-serif",
  display: "flex",
  alignItems: "center",
  transition: "background-color 0.2s",
  "&.Mui-selected": {
    backgroundColor: "rgba(33, 150, 243, 0.2) !important",
  },
  "&:hover": {
    backgroundColor: "rgba(200, 200, 200, 0.5)",
  },
});

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  label = "Select Option",
  options,
  value,
  onChange,
  disabled = false,
  style = {},
  width = "250px",
}) => {
  return (
    <div style={{ margin: "10px", ...style }}>
      <StyledLabel>{label}</StyledLabel>
      <StyledFormControl width={width}>
        <StyledSelect
          value={value}
          onChange={onChange}
          displayEmpty
          disabled={disabled}
          IconComponent={KeyboardArrowDownOutlinedIcon}
          MenuProps={{
            PaperProps: {
              style: {
                borderRadius: 0,
                width: "100%",
              },
            },
          }}
        >
          <StyledMenuItem value="" disabled>
            None
          </StyledMenuItem>
          {options.map((option) => (
            <StyledMenuItem key={option.value} value={option.value}>
              {option.label}
            </StyledMenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
    </div>
  );
};

export default CustomDropDown;
