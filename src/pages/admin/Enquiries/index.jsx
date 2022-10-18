import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./enquiries.module.scss";
import EnquiriesModal from "./EnquiriesModal";
import useApi from "utils/useApi";
import AuthContext from "utils/AuthContext";
import UseLocalStorage from "utils/UseLocalStorage";
import { BASE_URL, BOOKINGS, POPULATE_ALL } from "constants/apiKeys";

import Layout from "components/layout/Layout";
import OuterContainer from "components/layout/OuterContainer";
import Head from "components/layout/Head";
import Heading from "components/typography/Heading";
import AdminHeader from "components/admin/AdminHeader";
import InputsTheme from "components/forms/InputsTheme";
import { Mobile, TabletAndDesktop } from "components/layout/ScreenViewSize";
import MyLoader from "components/layout/MyLoader";
import AlertMessage from "components/forms/AlertMessage";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import { createTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const theme = createTheme({
  palette: {
    primary: {
      main: "#17396D",
    },
  },
});

function Enquiries() {
  const [auth] = useContext(AuthContext);
  const navigate = useNavigate();
  if (!auth) {
    navigate("/login");
  }

  const url = BASE_URL + BOOKINGS + POPULATE_ALL;
  const { bookings, loading, error, open, data, toggleItem, closeModal } =
    useApi(url);
  const [read, setRead] = UseLocalStorage("readEnq", []);
  const [filteredBookings, setFilteredBookings] = useState([]);

  const handleClick = (item, id, checked) => {
    toggleItem(item);
    if (checked && !checked) {
      setRead.filter((i) => i !== id);
    } else {
      setRead([...read, id]);
    }
  };

  const accommodations = bookings.map(
    (item) => item.attributes.establishment.data.attributes.title
  );
  const uniqueAccommodations = [...new Set(accommodations)];

  const formatDate = (value, locale = "en-GB") => {
    return new Date(value).toLocaleDateString(locale);
  };

  if (loading)
    return (
      <MyLoader height="100vh">Loading enquiries, Please wait...</MyLoader>
    );

  if (error) {
    return (
      <AlertMessage
        variant="error"
        title="Error"
        message="An error occured, Please try again later"
      />
    );
  }

  if (!bookings && !filteredBookings) {
    return <div>No Enquiries received</div>;
  }

  return (
    <Layout>
      <Head
        page="Admin - Enquiries"
        description="Holidaze Admin - Received Enquiries for establishments"
      />
      <OuterContainer>
        <AdminHeader
          heading="Enquiries"
          icon={<ArrowBackIcon />}
          iconLink="/establishments"
          iconToolTip="Go Back"
        >
          <TabletAndDesktop>
            <InputsTheme>
              <Autocomplete
                options={uniqueAccommodations}
                onKeyDown={(event) => setFilteredBookings(event.target.value)}
                onSelect={(event) => setFilteredBookings(event.target.value)}
                onBlur={(event) => setFilteredBookings(event.target.value)}
                sx={{ minWidth: 250 }}
                renderInput={(params) => (
                  <TextField {...params} label="Filter by accommodation" />
                )}
              />
            </InputsTheme>
          </TabletAndDesktop>
        </AdminHeader>
        <Box className="admin-grid" sx={{ flexGrow: 1, position: "relative" }}>
          <Mobile>
            <InputsTheme>
              <Autocomplete
                options={uniqueAccommodations}
                onKeyDown={(event) => setFilteredBookings(event.target.value)}
                onSelect={(event) => setFilteredBookings(event.target.value)}
                sx={{ minWidth: 250, marginBottom: "1em" }}
                renderInput={(params) => (
                  <TextField {...params} label="Filter by accommodation" />
                )}
              />
            </InputsTheme>
          </Mobile>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            {[...bookings]
              .filter((item) =>
                item.attributes.establishment.data.attributes.title.match(
                  new RegExp(filteredBookings, "i")
                )
              )
              .sort((b, a) => a.id - b.id)
              .map((item) => {
                const { name, email, checkin, checkout, guests } =
                  item.attributes;
                const establishment =
                  item.attributes.establishment.data.attributes.title;
                const checked = read.includes(item.id);
                return (
                  <Grid
                    item
                    xs={2}
                    sm={4}
                    md={4}
                    key={item.id}
                    onClick={() => handleClick(item, item.id, checked)}
                  >
                    <div
                      className={`${
                        checked ? "read" : ""
                      } admin-card admin-card--small`}
                    >
                      <Heading level={2}>{establishment}</Heading>
                      <span>
                        <span className="admin-card__property">Name: </span>
                        {name}
                      </span>
                      <span>
                        <span className="admin-card__property">Email: </span>
                        {email}
                      </span>
                      <span>
                        <span className="admin-card__property">Check-in: </span>
                        {formatDate(checkin)}
                      </span>
                      <span>
                        <span className="admin-card__property">Checkout: </span>
                        {formatDate(checkout)}
                      </span>
                      <Tooltip title={`${guests} Guests`}>
                        <div className={styles.guestsIcon}>
                          <PeopleRoundedIcon theme={theme} color="primary" />
                          {guests}
                        </div>
                      </Tooltip>
                    </div>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
        {open === true && data !== null && (
          <EnquiriesModal
            open={open}
            onClose={() => closeModal()}
            data={data}
            formatDate={formatDate}
          />
        )}
      </OuterContainer>
    </Layout>
  );
}

export default Enquiries;
