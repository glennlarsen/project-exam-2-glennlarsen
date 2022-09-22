import React from 'react'
import Layout from "components/layout/Layout";
import OuterContainer from "components/layout/OuterContainer";
import Head from "components/layout/Head";
import Heading from "components/typography/Heading";
import AdminHeader from 'components/admin/AdminHeader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function index() {
  return (
    <Layout>
      <Head
        page="Admin - Enquiries"
        description="Holidaze Admin - Received Enquiries from your establishments"
      />
      <OuterContainer>
        <AdminHeader heading="Add New Establishment" icon={<ArrowBackIcon />} iconToolTip="Go Back" iconLink="/establishments" />
      </OuterContainer>
    </Layout>
  )
}

export default index