import React from "react";
import Layout from "components/layout/Layout";
import OuterContainer from "components/layout/OuterContainer";
import Head from "components/layout/Head";
import Heading from "components/typography/Heading";

function Messages() {
  return (
    <Layout>
      <Head
        page="Admin - Messages"
        description="Holidaze Admin - Received messages from contact form"
      />
      <OuterContainer>
        <Heading level={1}>Messages</Heading>
      </OuterContainer>
    </Layout>
  );
}

export default Messages;
