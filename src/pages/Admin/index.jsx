import React from "react";
import Layout from "components/layout/Layout";
import OuterContainer from "../../components/layout/OuterContainer";
import Head from "../../components/layout/Head";

function index() {
  return (
    <Layout>
      <Head
        page="Login"
        description="Holidaze - Login to your admin dashboard"
      />
      <OuterContainer>
        Admin section here...
      </OuterContainer>
    </Layout>
  )
}

export default index;