import React from 'react'
import OuterContainer from "../../components/layout/OuterContainer";
import Head from "../../components/layout/Head";

function Login() {
  return (
    <>
      <Head
        page="Login"
        description="Holidaze - Find your perfect Hotel in Bergen"
      />
      <OuterContainer>
        <h1>Login!</h1>
      </OuterContainer>
    </>
  );
}

export default Login;