import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputsTheme from "components/forms/InputsTheme";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Heading from "components/typography/Heading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EMAIL_REGEX } from "./validationRules";

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: 800,
  width: "95%",
  bgcolor: "background.paper",
  borderRadius: "12px",
  gap: 1,
  boxShadow: 24,
  p: 4,
  margin: "0 auto",
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your first name")
    .min(2, `First Name must be at least 2 characters`),
  email: yup
    .string()
    .required("Please enter your email")
    .matches(EMAIL_REGEX, "Enter a valid email"),
  phone: yup.string().max(12, "Phone number is to long"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(10, `Message must be at least 10 characters`),
});

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
    <Box sx={boxStyle} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
          helperText={errors.name ? errors.name.message : " "}
        />

        <TextField
          label={"Email"}
          id="email"
          variant={"outlined"}
          type="email"
          {...register("email")}
          error={Boolean(errors.email)}
          helperText={errors.email ? errors.email.message : " "}
        />

        <TextField
          label={"Phone"}
          id="phone"
          variant={"outlined"}
          type="number"
          placeholder="Optional"
          {...register("phone")}
          error={Boolean(errors.phone)}
          helperText={errors.phone ? errors.phone.message : " "}
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
          helperText={errors.message ? errors.message.message : " "}
        />
      </InputsTheme>
      <button type="submit" className="btn btn-form">
        Send
      </button>
    </Box>
  );
}

export default ContactForm;
