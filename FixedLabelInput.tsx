import React from "react";
import { styled } from "@mui/material/styles";
import { Box, TextField, TextFieldProps } from "@mui/material";

interface FixedLabelTextFieldProps extends TextFieldProps {
  label: string;
  width?: string | number;
}

// Styled Label
const StyledLabel = styled("label")({
  display: "block",
  fontSize: "13px",
  fontFamily: "'Frutiger 55 Roman', sans-serif",
  marginBottom: "6px",
  color: "#646464",
});

// Styled Input Wrapper
const StyledBox = styled(Box)<{ width?: string | number }>(({ width }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: width ?? "100%",
}));

// Main Component
const FixedLabelTextField: React.FC<FixedLabelTextFieldProps> = ({
  label,
  width,
  ...props
}) => {
  return (
    <StyledBox width={width}>
      <StyledLabel>{label}</StyledLabel>
      <TextField
        variant="outlined"
        fullWidth
        sx={{
          height: 36,
          backgroundColor: "#ffffff",
          "& .MuiOutlinedInput-root": {
            height: "100%",
            borderRadius: 0,
            "& fieldset": {
              border: "1px solid #646464",
            },
            "&:hover fieldset": {
              borderColor: "#646464",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#646464",
            },
          },
        }}
        {...props}
      />
    </StyledBox>
  );
};

export default FixedLabelTextField;
