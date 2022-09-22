import React from "react";
import Layout from "components/layout/Layout";
import OuterContainer from "components/layout/OuterContainer";
import Head from "components/layout/Head";
import Heading from "components/typography/Heading";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./establishments.scss";
import { NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import MyLoader from "components/layout/MyLoader";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#17396D",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#3474D4",
    },
  },
  components: {},
});

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
        <ThemeProvider theme={theme}>
          <div className="admin-header">
            <Heading level={1}>Establishments</Heading>
            <Tooltip title="Add new">
              <NavLink to="/addestablishment">
                <Fab color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </NavLink>
            </Tooltip>
          </div>
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
        </ThemeProvider>
      </OuterContainer>
    </Layout>
  );
}

export default Establishments;
