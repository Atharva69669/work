import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CustomCheckbox from "./CustomCheckbox";
import CustomRadio from "./CustomRadio";
import CustomDropDown from "./CustomDropDown";
import CustomTextArea from "./CustomTextArea";
import FixedLabelTextField from "./FixedLabelTextField";
import { SelectChangeEvent } from "@mui/material";

const Display: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("option1");
  const [dropdownValue, setDropdownValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleDropdownChange = (event: SelectChangeEvent) => {
    setDropdownValue(event.target.value);
  };

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  return (
    <Box sx={{ padding: 4, maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Custom Components Showcase
      </Typography>

      {/* Custom Checkbox */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Custom Checkbox
        </Typography>
        <CustomCheckbox
          label="Accept Terms and Conditions"
          checked={isChecked}
          onChange={(e, checked) => setIsChecked(checked)}
        />
      </Box>

      {/* Custom Radio Buttons */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Custom Radio Buttons
        </Typography>
        <CustomRadio
          label="Option 1"
          value="option1"
          checked={selectedRadio === "option1"}
          onChange={(e) => setSelectedRadio(e.target.value)}
        />
        <CustomRadio
          label="Option 2"
          value="option2"
          checked={selectedRadio === "option2"}
          onChange={(e) => setSelectedRadio(e.target.value)}
        />
      </Box>

      {/* Custom DropDown */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Custom DropDown
        </Typography>
        <CustomDropDown
          label="Select your role"
          value={dropdownValue}
          onChange={handleDropdownChange}
          options={[
            { label: "Developer", value: "developer" },
            { label: "Designer", value: "designer" },
            { label: "Manager", value: "manager" },
          ]}
        />
      </Box>

      {/* Custom TextArea */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Custom Text Area
        </Typography>
        <CustomTextArea
          label="Write a message"
          placeholder="Type your message here..."
          value={textValue}
          onChange={handleTextAreaChange}
        />
      </Box>

      {/* Fixed Label TextField */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Fixed Label TextField
        </Typography>
        <FixedLabelTextField
          label="Your Name"
          placeholder="Enter your name"
          value={textFieldValue}
          onChange={handleTextFieldChange}
          width="100%"
        />
      </Box>
    </Box>
  );
};

export default Display;
