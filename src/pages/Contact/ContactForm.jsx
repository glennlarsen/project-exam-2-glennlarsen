import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./contactForm.module.scss";
import schemaContact from "./schemaContact";
import PostMessage from "utils/PostMessage";
import InputsTheme from "components/forms/InputsTheme";
import Heading from "components/typography/Heading";
import MyLoader from "components/layout/MyLoader";
import AlertMessage from "components/forms/AlertMessage";

import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaContact),
  });

  // Function that will run when form is submitted
  async function onSubmit(data) {
    setLoading(true);
    const message = await PostMessage(data);
    if (message.success) {
      setLoading(false);
      setSubmitted(true);
      reset();
    } else {
      setLoading(false);
      setSubmitted(false);
      setError(true);
    }
  }

  if (loading) {
    return <MyLoader centered="100vh"> Sending, please wait...</MyLoader>;
  }

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
    <Box
      className={styles.contactForm}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Heading level={2}>
        Send us a message
        <SendRoundedIcon
          sx={{
            color: "#17396D",
            verticalAlign: "top",
            rotate: "-22deg",
            marginLeft: "0.3em",
          }}
        />
      </Heading>
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
          label={"Phone"}
          id="phone"
          variant={"outlined"}
          type="number"
          placeholder="Optional"
          {...register("phone")}
          error={Boolean(errors.phone)}
          helperText={errors.phone ? errors.phone.message : ""}
          InputProps={
            errors.phone
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
          id="message"
          label="Message"
          multiline
          rows={5}
          type="text"
          placeholder="Write your message here..."
          {...register("message")}
          error={Boolean(errors.message)}
          helperText={errors.message ? errors.message.message : ""}
          InputProps={
            errors.message
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
      </InputsTheme>
      {submitted && (
        <AlertMessage
          variant="success"
          title="Sent!"
          message="Thank you for your message. We will get back to you shortly."
        />
      )}
      <button type="submit" className="btn btn-form">
        Send
      </button>
    </Box>
  );
}

export default ContactForm;
