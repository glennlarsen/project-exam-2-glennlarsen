import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from "utils/AuthContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Heading from "components/typography/Heading";
import InputsTheme from "components/forms/InputsTheme";
import { AUTH_URL } from "utils/api";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 400,
  width: "95%",
  bgcolor: "background.paper",
  borderRadius: "12px",
  gap: 2,
  boxShadow: 24,
  p: 4,
  margin: "auto",
  mb: 4,
};

const url = AUTH_URL

const schema = yup.object().shape({
    identifier: yup.string().required("Please enter your username"),
    password: yup.string().required("Please enter your password"),
  });

const LoginForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);
    reset();

    try {
      const response = await axios.post(url, data);
      console.log(response)
      setAuth(response.data);
      navigate("/admin");
    } catch (error) {
      console.log("error", error);
      setLoginError("Wrong username or password");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box sx={boxStyle} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading level={1}>Login</Heading>
      <InputsTheme>
        <TextField
          fullWidth
          label={"Username"}
          variant={"outlined"}
          type="username"
          {...register("identifier")}
          error={Boolean(errors.identifier)}
          helperText={errors.identifier ? errors.identifier.message : ""}
          InputProps={
            errors.identifier
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <ErrorRoundedIcon color="error" />
                    </InputAdornment>
                  ),
                }
              : ""
          }
        />
        <TextField
          fullWidth
          label={"Password"}
          variant={"outlined"}
          type="password"
          {...register("password")}
          error={Boolean(errors.password)}
          helperText={errors.password ? errors.password.message : ""}
          InputProps={
            errors.password
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <ErrorRoundedIcon color="error" />
                    </InputAdornment>
                  ),
                }
              : ""
          }
        />
      </InputsTheme>
      <button type="submit" className="btn">{submitting ? "Loggin in..." : "Login"}</button>
    </Box>
  );
};

export default LoginForm;
