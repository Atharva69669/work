import React from "react";
import { Select, MenuItem, FormControl, SelectChangeEvent } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

interface Option {
  value: string;
  label: string;
}

interface CustomDropDownProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const StyledFormControl = styled(FormControl)({
  width: "250px",
  borderRadius: "0px",
  backgroundColor: "white",
});

const StyledLabel = styled("label")({
  display: "block",
  fontSize: "13px",
  fontFamily: "'Frutiger 55 Roman', sans-serif",
  marginBottom: "6px",
  color: "#646464",
});

const StyledSelect = styled(Select)({
  height: "36px",
  width: "100%",
  border: "1px solid #646464",
  fontSize: "15px",
  fontFamily: "'Frutiger 55 Roman', sans-serif",
  borderRadius: "0px",
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
  display: "flex",
  alignItems: "center",
  fontSize: "15px",
  fontFamily: "'Frutiger 55 Roman', sans-serif",
  transition: "background-color 0.2s",
  "&.Mui-selected": {
    backgroundColor: "rgba(33, 150, 243, 0.2) !important",
  },
  "&:hover": {
    backgroundColor: "rgba(200, 200, 200, 0.5)",
  },
});

const menuProps = {
  PaperProps: {
    style: {
      borderRadius: "0px",
      width: "250px",
      transform: "translateX(-7px)",
    },
  },
};

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  label = "Select Option",
  options = [],
  value,
  onChange,
  disabled = false,
  style = {},
}) => {
  return (
    <div style={{ margin: "10px", ...style }}>
      <StyledLabel>{label}</StyledLabel>
      <StyledFormControl>
        <StyledSelect
          value={value}
          onChange={onChange}
          displayEmpty
          MenuProps={menuProps}
          IconComponent={KeyboardArrowDownOutlinedIcon}
          disabled={disabled}
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

