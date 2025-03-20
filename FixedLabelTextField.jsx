import React from "react";
import "./input.css";
import { TextField, FormControl, InputLabel } from "@mui/material";

export default function FixedLabelTextField() {
  return (
    <FormControl
      variant="outlined"
      sx={{
        position: "relative",
      }}
    >
      <InputLabel
        shrink={true}
        sx={{
          position: "absolute",
          top: 8,
          fontSize: 16,
        }}
      >
        Fixed Label
      </InputLabel>
      <TextField variant="outlined" sx={{ mt: 3 }} fullWidth />
    </FormControl>
  );
}
