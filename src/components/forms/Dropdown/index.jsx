import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const DropDown = ({ children, label, dropValue, dropChange }) => {
 
  const theme = createTheme({
    shape: {
      borderRadius: "12px",
      width: "100%",
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <Box>
      <FormControl fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={dropValue}
          label={label}
          onChange={dropChange}
        >
          {children}
        </Select>
      </FormControl>
    </Box>
    </ThemeProvider>
  );
};

export default DropDown;
