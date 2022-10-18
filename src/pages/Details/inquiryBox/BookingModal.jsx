import React from "react";
import { Controller } from "react-hook-form";
import styles from "./inquiry.module.scss";
import InputsTheme from "components/forms/InputsTheme";
import Heading from "components/typography/Heading";
import AlertMessage from "components/forms/AlertMessage";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {
  ThemeProvider,
  createTheme,
  experimental_sx as sx,
} from "@mui/material/styles";
import "moment/locale/en-gb";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterMoment } from "@mui/x-date-pickers-pro/AdapterMoment";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

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

const BookingModal = ({
  open,
  onClose,
  title,
  days,
  price,
  register,
  handleSubmit,
  errors,
  control,
  onSubmit,
  defaultDates,
  submitted,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            className={styles.modal}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            id="enquiryForm"
            noValidate
          >
            <CloseRoundedIcon onClick={onClose} className={styles.modalClose} />
            <Heading level={3}>Send a booking request for {title}</Heading>
            <InputsTheme>
              <TextField
                label={"Name"}
                id="name"
                variant={"outlined"}
                type="text"
                {...register("name")}
                error={Boolean(errors.name)}
                helperText={errors.name ? errors.name.message : ""}
                InputProps={
                  errors.name
                    ? {
                        endAdornment: (
                          <InputAdornment position="end">
                            <ErrorRoundedIcon color="error" />
                          </InputAdornment>
                        ),
                      }
                    : null
                }
              />
              <TextField
                label={"Email"}
                id="email"
                variant={"outlined"}
                type="email"
                {...register("email")}
                error={Boolean(errors.email)}
                helperText={errors.email ? errors.email.message : ""}
                InputProps={
                  errors.email
                    ? {
                        endAdornment: (
                          <InputAdornment position="end">
                            <ErrorRoundedIcon color="error" />
                          </InputAdornment>
                        ),
                      }
                    : null
                }
              />
              <TextField
                id="comment"
                label="Comment"
                multiline
                maxRows={4}
                type="text"
                placeholder="optional"
                {...register("comment")}
              />
            </InputsTheme>
            <Controller
              name="dates"
              defaultValue={defaultDates}
              control={control}
              render={({ field }) => (
                <LocalizationProvider
                  dateAdapter={AdapterMoment}
                  adapterLocale="en-gb"
                  localeText={{ start: "Chek-in", end: "Checkout" }}
                >
                  <DateRangePicker
                    disablePast
                    label="dates"
                    renderInput={(startProps, endProps) => (
                      <ThemeProvider theme={theme}>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}></Box>
                        <TextField {...endProps} />
                      </ThemeProvider>
                    )}
                    {...field}
                  />
                </LocalizationProvider>
              )}
            />
            <FormControl>
              <InputLabel id="guests-label">Guests</InputLabel>
              <Controller
                render={({ field }) => (
                  <Select
                    label="Guests"
                    sx={{ borderRadius: "12px" }}
                    {...field}
                  >
                    <MenuItem value={1}>1 guest</MenuItem>
                    <MenuItem value={2}>2 guests</MenuItem>
                    <MenuItem value={3}>3 guests</MenuItem>
                    <MenuItem value={4}>4 guests</MenuItem>
                  </Select>
                )}
                name="guests"
                control={control}
                defaultValue={1}
              />
            </FormControl>
            <button form="enquiryForm" type="submit" className="btn">
              Send
            </button>
            <Table aria-label="price table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {price.toLocaleString().replace(/,/g, " ")} NOK x {days} Nights
              </TableCell>
              <TableCell align="right">
                {(days * price).toLocaleString().replace(/,/g, " ")} NOK
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  borderBottom: "none",
                  fontSize: "1rem",
                }}
              >
                Total
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  borderBottom: "none",
                  fontSize: "1rem",
                }}
              >
                {(days * price).toLocaleString().replace(/,/g, " ")} NOK
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
            {submitted && (
              <AlertMessage
                variant="success"
                message={`Thank you for your booking. ${title} will contact you shortly`}
              />
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default BookingModal;
