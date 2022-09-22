import React from "react";
import Layout from "components/layout/Layout";
import OuterContainer from "components/layout/OuterContainer";
import Head from "components/layout/Head";
import Heading from "components/typography/Heading";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import "./establishments.scss";
import MyLoader from "components/layout/MyLoader";
import AdminHeader from "components/admin/AdminHeader";

function Establishments({ establishments, loading, error }) {
  if (loading) {
    return <MyLoader />;
  }

  if (error) {
    return <div>An error occured</div>;
  }

  if (!establishments) {
    return (
      <div style={{ height: "130px", marginTop: "13em" }}>
        No Establishments available
      </div>
    );
  }

  return (
    <Layout>
      <Head
        page="Admin - Establishments"
        description="Holidaze Admin - View of your current establishments"
      />
      <OuterContainer>
          <AdminHeader heading="Establishments" icon={<AddIcon />} iconToolTip="Add New" iconLink="/addestablishment" />
          <Box
            className="admin-grid"
            sx={{ flexGrow: 1, position: "relative" }}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 2, sm: 8, md: 12 }}
            >
              {establishments.map((item, index) => {
                const { title, address, type, updatedAt } = item.attributes;
                const image = item.attributes.images.data[0].attributes.url;
                const formatDate = (value, locale = "en-GB") => {
                  return new Date(value).toLocaleDateString(locale);
                };
                return (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <div className="admin-card">
                      <Heading level={2}>{title}</Heading>
                      <span>
                        <span className="admin-card__property">Type: </span>
                        {type}
                      </span>
                      <span>
                        <span className="admin-card__property">Address: </span>
                        {address}
                      </span>
                      <img src={image} alt="" />
                      <span>
                        <span className="admin-card__property">
                          Last Update:{" "}
                        </span>
                        {formatDate(updatedAt)}
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

export default Establishments;
