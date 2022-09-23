import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputsTheme from "components/forms/InputsTheme";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Heading from "components/typography/Heading";
import { yupResolver } from "@hookform/resolvers/yup";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import schema from "utils/schema";

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: 800,
  width: "95%",
  bgcolor: "background.paper",
  borderRadius: "12px",
  gap: 2,
  boxShadow: 24,
  p: 4,
  margin: "0 auto",
};

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit() {
    setSubmitted(true);
    reset();
  }

  return (
    <Box
      sx={boxStyle}
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
      <button type="submit" className="btn btn-form">
        Send
      </button>
    </Box>
  );
}

export default ContactForm;
