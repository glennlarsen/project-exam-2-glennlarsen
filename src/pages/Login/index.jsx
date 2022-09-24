import { useContext } from "react";
import Layout from "components/layout/Layout";
import OuterContainer from "components/layout/OuterContainer";
import Head from "components/layout/Head";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import AuthContext from "utils/AuthContext";

function Login() {
  const [auth, ] = useContext(AuthContext);
  const navigate = useNavigate();

  if(auth) {
    navigate("/")
  } 

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
