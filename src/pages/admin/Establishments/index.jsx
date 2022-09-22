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
import Tooltip from '@mui/material/Tooltip';

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

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: 800,
  width: "95%",
  bgcolor: "background.paper",
  borderRadius: "12px",
  gap: 2,
  boxShadow: 3,
  p: 4,
  margin: "0 auto",
};

function Establishments({ establishments, loading, error }) {
  console.log(establishments);

  return (
    <Layout>
      <Head
        page="Admin - Establishments"
        description="Holidaze Admin - View of your current establishments"
      />
      <OuterContainer>
        <ThemeProvider theme={theme}>
          <div className="admin-header">
          <Heading level={1}>
            Establishments
            </Heading>
            <Tooltip title="Add new">
            <NavLink to="/addestablishment">
              <Fab color="primary" aria-label="add">
                <AddIcon /> 
              </Fab>
            </NavLink>
            </Tooltip>
          </div>
          <Box sx={{ flexGrow: 1, position: "relative" }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 2, sm: 8, md: 12 }}
            >
              {establishments.map((item, index) => {
                const { title, address, type, updatedAt } = item.attributes;
                const image = item.attributes.images.data[0].attributes.url;
                return (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Box sx={boxStyle}>
                      <Heading level={2}>{title}</Heading>
                      <span>Type: {type}</span>
                      <address>Address: {address}</address>
                      <img src={image} alt="" />
                      <span>Last Update: {updatedAt}</span>
                    </Box>
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
