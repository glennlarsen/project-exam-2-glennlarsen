import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./login.module.scss";
import schemaLogin from "./schemaLogin";
import AuthContext from "utils/AuthContext";
import { AUTH_URL } from "constants/apiKeys";
import Heading from "components/typography/Heading";
import InputsTheme from "components/forms/InputsTheme";
import AlertMessage from "components/forms/AlertMessage";

import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

const url = AUTH_URL;

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
    resolver: yupResolver(schemaLogin),
  });

  const [, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);
    reset();

    try {
      const response = await axios.post(url, data);
      console.log(response);
      setAuth(response.data);
      navigate("/establishments");
    } catch (error) {
      console.log("error", error);
      setLoginError("Wrong username or password");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box
      className={styles.loginForm}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading level={1}>Login</Heading>
      <InputsTheme>
        {loginError && (
          <AlertMessage variant="error" title="Error" message={loginError} />
        )}
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
      <button type="submit" className="btn">
        {submitting ? "Loggin in..." : "Login"}
      </button>
    </Box>
  );
};

export default LoginForm;
