import React from 'react'
import Layout from "components/layout/Layout";
import OuterContainer from "components/layout/OuterContainer";
import Head from "components/layout/Head";
import Heading from "components/typography/Heading";


function index() {
  return (
    <Layout>
      <Head
        page="Admin - Enquiries"
        description="Holidaze Admin - Received Enquiries from your establishments"
      />
      <OuterContainer>
        <Heading level={1}>Add New Establishment</Heading>
      </OuterContainer>
    </Layout>
  )
}

export default index