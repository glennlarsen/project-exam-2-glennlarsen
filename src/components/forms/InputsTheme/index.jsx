import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const textFields = createTheme({
  shape: {
    borderRadius: "12px",
  },
});

function InputsTheme({ children }) {
  return <ThemeProvider theme={textFields}>{children}</ThemeProvider>;
}

export default InputsTheme;
