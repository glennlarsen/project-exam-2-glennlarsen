import React from "react";
import Layout from "components/layout/Layout";
import OuterContainer from "../../components/layout/OuterContainer";
import Head from "../../components/layout/Head";
import Button from "components/forms/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Heading from "components/typography/Heading";
import InputsTheme from "components/forms/InputsTheme";

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

function Login() {
  return (
    <Layout>
      <Head
        page="Login"
        description="Holidaze - Login to your admin dashboard"
      />
      <OuterContainer>
        <Box sx={boxStyle} component="form">
          <Heading level={1}>Login</Heading>
          <InputsTheme>
            <TextField
              fullWidth
              label={"Username"}
              variant={"outlined"}
              type="username"
            />
            <TextField
              fullWidth
              label={"Password"}
              variant={"outlined"}
              type="password"
            />
          </InputsTheme>
          <Button type={"btn-login"}>Login</Button>
        </Box>
      </OuterContainer>
    </Layout>
  );
}

export default Login;
