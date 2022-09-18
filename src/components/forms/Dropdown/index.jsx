import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const DropDown = ({ guests, onChange }) => {
 
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
        <InputLabel id="Guests-select-label">Guests</InputLabel>
        <Select
          labelId="Guests-select-label"
          id="Guests-select"
          value={guests}
          label="Guests"
          onChange={onChange}
        >
          <MenuItem value={1}>1 guest</MenuItem>
          <MenuItem value={2}>2 guests</MenuItem>
          <MenuItem value={3}>3 guests</MenuItem>
          <MenuItem value={4}>4 guests</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </ThemeProvider>
  );
};

export default DropDown;
