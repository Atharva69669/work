import { styled } from "@mui/material/styles";
import { Box, TextField } from "@mui/material";

const StyledLabel = styled("label")({
  display: "block",
  fontSize: "13px",
  fontFamily: "'Frutiger 55 Roman', sans-serif",
  margin: "0px 0px 6px",
  color: "#646464",
  width: "187px", // Fixed width
  height: "15px", // Fixed height
});

function FixedLabelTextField({ label, type = "text", placeholder = "", ...props }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <StyledLabel>{label}</StyledLabel>

        <TextField
        type={type} // Allows different input types
        placeholder={placeholder}
        variant="outlined"
        sx={{
          width: 190,
          height: 36,
          backgroundColor: "#ffffff",
          padding: "1px",
          "& .MuiOutlinedInput-root": {
            height: "100%",
            borderRadius: "0px", 
          },
        }}
        {...props} 
      />
    </Box>
  );
}

export default FixedLabelTextField;
