import React from "react";
import Layout from "components/layout/Layout";
import OuterContainer from "components/layout/OuterContainer";
import Head from "components/layout/Head";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <Layout>
      <Head
        page="Login"
        description="Holidaze - Login to your admin dashboard"
      />
      <OuterContainer>
        <LoginForm />
      </OuterContainer>
    </Layout>
  );
}

export default Login;
