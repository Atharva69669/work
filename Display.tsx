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
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h2>Component Comparison</h2>

      {/* Custom Dropdown */}
      <div>
        <h3>Custom Dropdown</h3>
        <CustomDropDown
          label="Custom Dropdown"
          options={options}
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
        />
      </div>

      {/* Broadridge Dropdown */}
      <div>
        <h3>Broadridge Dropdown</h3>
        <FormControl style={{ width: "250px" }}>
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

      {/* Additional Components can be added here */}
      
    </div>
  );
};

