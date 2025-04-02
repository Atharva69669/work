import React from "react";
import CustomDropDown from "./CustomDropDown"; // Your custom dropdown component
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export const Display: React.FC = () => {
  const [customValue, setCustomValue] = React.useState("");
  const [broadridgeValue, setBroadridgeValue] = React.useState("");

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Component Comparison</h2>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "40px" }}>
        {/* Left: Custom Dropdown */}
        <div style={{ flex: 1 }}>
          <h3 style={{ textAlign: "center" }}>Custom Dropdown</h3>
          <CustomDropDown
            label="Custom Dropdown"
            options={options}
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
          />
        </div>

        {/* Right: Broadridge Dropdown */}
        <div style={{ flex: 1 }}>
          <h3 style={{ textAlign: "center" }}>Broadridge Dropdown</h3>
          <FormControl style={{ width: "100%" }}>
            <InputLabel>Broadridge Dropdown</InputLabel>
            <Select
              value={broadridgeValue}
              onChange={(e) => setBroadridgeValue(e.target.value)}
            >
              <MenuItem value="" disabled>
                None
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};
