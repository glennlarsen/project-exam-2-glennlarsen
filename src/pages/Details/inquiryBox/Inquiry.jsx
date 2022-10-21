import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import styles from "./inquiry.module.scss";
import schemaEnquiry from "./schemaEnquiry";
import PostEnquiry from "utils/PostEnquiry";
import MyLoader from "components/layout/MyLoader";
import AlertMessage from "components/forms/AlertMessage";
import FloatingContact from "./StickyBookButton";
import BookingModal from "./BookingModal";

import moment from "moment";
import { HideOn } from "react-hide-on-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import MenuItem from "@mui/material/MenuItem";
import { Icon } from "@iconify/react";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
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

const Inquiry = ({ price, tripLink, stars, rating, breakfast, title, id }) => {
  const todaysDate = moment().endOf("day");
  const tomorrowsDate = moment().add(1, "day").endOf("day");
  const [defaultDates] = useState([todaysDate, tomorrowsDate]);
  const [days, setDays] = useState(1);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const totalPrice = days*price;

  const handleOpen = (event) => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaEnquiry),
  });

  useEffect(() => {
    return () => {
      const dates = watch("dates");
      const checkinDate = dates[0];
      const checkoutDate = dates[1];
      const days = checkoutDate ? checkoutDate.diff(checkinDate, "days") : 0;
      setDays(days);
    };
  }, [watch("dates")]);

  // Function that will run when form is submitted
  async function onSubmit(data) {
      setLoading(true);
      const enquiry = await PostEnquiry(data, id, totalPrice, days);
      if (enquiry.success) {
        setLoading(false);
        setSubmitted(true);
        reset();
      } else {
        setLoading(false);
        setSubmitted(false);
        setError(true);
      }
  }

  let numberOfStars = [];
  for (let i = 0; i < stars; i++) {
    numberOfStars.push(<FontAwesomeIcon key={numberOfStars} icon={faStar} />);
  }

  if (loading) return <MyLoader height="100vh" />;

  if (error) {
    return (
      <AlertMessage
        variant="error"
        title="Error"
        message="An error occured, Please try again later"
      />
    );
  }

  return (
    <div className={styles.inquiryContainer}>
      <div className={styles.inquiryBox} id="inquiryBox">
        <div className={styles.inquiryBoxHeader}>
          <span>
            <span className={styles.inquiryBoxPrice}>
              From {price.toLocaleString().replace(/,/g, " ")} NOK
            </span>{" "}
            per night
          </span>
          <div>{numberOfStars}</div>
          <span className={styles.inquiryBoxBreakfast}>
            {breakfast ? "Breakfast Included" : "Breakfast not Included"}
          </span>
        </div>
        <div className={styles.reviews}>
          <div className={styles.inquiryBoxCircle}>
            <Icon
              icon="entypo-social:tripadvisor"
              color="#3474d4"
              width="35"
              height="35"
            />
            {rating.toFixed(1)}
          </div>
          {tripLink ? (
            <a href={tripLink}>
              <span>Reviews</span>
            </a>
          ) : (
            ""
          )}
        </div>
        <div className={styles.inquiryBoxForm}>
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
                <Select label="Guests" sx={{ borderRadius: "12px" }} {...field}>
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
        </div>
        <button className="btn" onClick={handleOpen}>
          Book
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
        <HideOn divID="map">
          <FloatingContact
            onClick={handleOpen}
            price={price}
            stars={numberOfStars}
          />
        </HideOn>
        <BookingModal
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          control={control}
          open={open}
          defaultDates={defaultDates}
          onClose={handleClose}
          title={title}
          onSubmit={onSubmit}
          submitted={submitted}
          days={days}
          price={price}
        />
      </div>
    </div>
  );
};

export default Inquiry;
