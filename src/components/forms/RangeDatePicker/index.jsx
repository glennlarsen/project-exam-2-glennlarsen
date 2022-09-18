import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  ThemeProvider,
  createTheme,
  experimental_sx as sx,
} from "@mui/material/styles";
import "moment/locale/fr";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterMoment } from "@mui/x-date-pickers-pro/AdapterMoment";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

function RangeDatePicker({value, onChange}) {
  

  const theme = createTheme({
    shape: {
      borderRadius: "12px",
      width: "100%",
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: sx({
            width: "100%",
          }),
        },
      },
    },
  });

  return (
    <Stack spacing={3}>
      <LocalizationProvider
        dateAdapter={AdapterMoment}
        adapterLocale={"fr"}
        localeText={{ start: "Chek-in", end: "Checkout" }}
      >
        <DateRangePicker
          disablePast
          value={value}
          onChange={onChange}

          renderInput={(startProps, endProps) => (
            <ThemeProvider theme={theme}>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}></Box>
              <TextField {...endProps} />
            </ThemeProvider>
          )}
        />
      </LocalizationProvider>
    </Stack>
  );
}

export default RangeDatePicker;