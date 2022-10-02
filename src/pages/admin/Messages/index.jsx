import React, { useContext } from "react";
import Layout from "components/layout/Layout";
import OuterContainer from "components/layout/OuterContainer";
import Head from "components/layout/Head";
import AdminHeader from "components/admin/AdminHeader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Heading from "components/typography/Heading";
import useApi from "utils/useApi";
import { BASE_URL, MESSAGES } from "constants/apiKeys";
import MessageModal from "./MessageModal";
import MyLoader from "components/layout/MyLoader";
import useLocalStorage from "utils/UseLocalStorage";
import AlertMessage from "components/forms/AlertMessage";
import AuthContext from "utils/AuthContext";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const [auth] = useContext(AuthContext);
  const navigate = useNavigate();
  if (!auth) {
    navigate("/login");
  }

  const url = BASE_URL + MESSAGES;
  const { messages, loading, error, open, data, toggleItem, closeModal } =
    useApi(url);
  console.log(messages);

  const ascending = [...messages].sort((b, a) => a.id - b.id);
  console.log(ascending);

  const [read, setRead] = useLocalStorage("readMess", []);

  const handleClick = (item, id, checked) => {
    toggleItem(item);
    if (checked || !checked) {
      setRead([...read, id]);
    } else {
      return null;
    }
  };

  if (loading)
    return <MyLoader height="100vh">Loading Messages, Please wait...</MyLoader>;

  if (error) {
    return (
      <AlertMessage
        variant="error"
        title="Error"
        message="An error occured, Please try again later"
      />
    );
  }

  if (!messages) {
    return <div>No Messages received</div>;
  }

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
            {[...messages]
              .sort((b, a) => a.id - b.id)
              .map((item) => {
                const { name, email, phone, message } = item.attributes;
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
                      <Heading level={2}>{name}</Heading>
                      <span>
                        <span className="admin-card__property">Email: </span>
                        {email}
                      </span>
                      <span>
                        <span className="admin-card__property">Phone: </span>
                        {phone.length > 3 ? phone : "not provided"}
                      </span>
                      <span className="admin-card__property--overflow">
                        <span className="admin-card__property">Message: </span>
                        {message}
                      </span>
                    </div>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
        {open === true && data !== null && (
          <MessageModal open={open} onClose={() => closeModal()} data={data} />
        )}
      </OuterContainer>
    </Layout>
  );
};

export default Messages;
