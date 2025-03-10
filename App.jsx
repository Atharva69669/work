import React from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import { Paper, Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import schema from "./schema.json";
import uischema from "./uischema.json";
import { useState } from "react";

function App()
{
  const [data, setData] = useState({});
  const theme=createTheme({
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            padding: "10px",
          },
          input: {
            color: "#333",
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: "#666",
            fontWeight: "bold",
          },
        },
      },
    },
  });
  return (
    <div>
      <h2>Dynamic Form using JSON Forms</h2>
      <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
        <Paper sx={{ padding: "20px", borderRadius: "12px", boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom>
            Loan Application Form
          </Typography>
          <JsonForms schema={schema} uischema={uischema} renderers={materialRenderers} cells={materialCells} />
        </Paper>
      </Box>
    </ThemeProvider>
    </div>
  );
}

export default App;