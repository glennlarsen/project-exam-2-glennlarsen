import React from "react";
import Layout from "components/layout/Layout";
import OuterContainer from "components/layout/OuterContainer";
import Head from "components/layout/Head";
import AdminHeader from "components/admin/AdminHeader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Heading from "components/typography/Heading";
import useApi from "utils/useApi";
import { BASE_URL, MESSAGES } from "utils/api";

function Messages() {
  const url = BASE_URL + MESSAGES;
  const { messages, loading, error } = useApi(url);

  console.log(messages);

  return (
    <Layout>
      <Head
        page="Admin - Messages"
        description="Holidaze Admin - Received messages from contact form"
      />
      <OuterContainer>
        <AdminHeader
          heading="Messages"
          icon={<ArrowBackIcon />}
          iconLink="/establishments"
          iconToolTip="Go Back"
        />
        <Box className="admin-grid" sx={{ flexGrow: 1, position: "relative" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            {messages.map((item, index) => {
              const { name, email, phone, message } = item.attributes;

              return (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <div className="admin-card">
                    <Heading level={2}>{name}</Heading>
                    <span>
                      <span className="admin-card__property">Email: </span>
                      {email}
                    </span>
                    <span>
                      <span className="admin-card__property">Phone: </span>
                      {phone}
                    </span>
                    <span>
                      <span className="admin-card__property">Message: </span>
                      {message}
                    </span>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </OuterContainer>
    </Layout>
  );
}

export default Messages;
