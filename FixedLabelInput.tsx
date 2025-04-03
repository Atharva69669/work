import { styled } from "@mui/material/styles";
import { Box, TextField, TextFieldProps } from "@mui/material";

// Styled Label
const StyledLabel = styled("label")({
  display: "block",
  fontSize: "13px",
  fontFamily: "'Frutiger 55 Roman', sans-serif",
  margin: "0px 0px 6px",
  color: "#646464",
  width: "187px",
  height: "15px",
});

// Define Props Type
interface FixedLabelTextFieldProps extends TextFieldProps {
  label: string;
}

const FixedLabelTextField: React.FC<FixedLabelTextFieldProps> = ({ label, ...props }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      {/* Fixed Label */}
      <StyledLabel>{label}</StyledLabel>

      {/* Input Field with Exact 1px Border */}
      <TextField
        variant="outlined"
        sx={{
          width: 190,
          height: 36,
          backgroundColor: "#ffffff",
          padding: "1px",
          "& .MuiOutlinedInput-root": {
            height: "100%",
            borderRadius: "0px", // No border-radius
            "& fieldset": {
              border: "1px solid #646464", // Exact border override
            },
            "&:hover fieldset": {
              border: "1px solid #646464", // Keeps same on hover
            },
            "&.Mui-focused fieldset": {
              border: "1px solid #646464", // Keeps same on focus
            },
          },
        }}
        {...props} // Pass all input-related props
      />
    </Box>
  );
};

export default FixedLabelTextField;
