import React from "react";
import TextField from "@mui/material/TextField";
import FixedLabelTextField from "./FixedLabelTextField";

function App() {
  return (
    <>
      {/* 
     label: Outlined (Specifies the floating label text that appears inside the text field, moves up when focused)
     variant="outlined"
     Defines the style of the text field.
     Possible values:
     outlined → Default, input field with a border.
     filled → Background-filled field.
     standard → No border, only underline.
    */}


      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined"/> */}

      <FixedLabelTextField/>


    </>
  );
}

export default App;
