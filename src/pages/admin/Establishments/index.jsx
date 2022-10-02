import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "components/layout/Layout";
import OuterContainer from "components/layout/OuterContainer";
import Head from "components/layout/Head";
import Heading from "components/typography/Heading";
import AlertMessage from "components/forms/AlertMessage";
import MyLoader from "components/layout/MyLoader";
import AdminHeader from "components/admin/AdminHeader";
import { Mobile, TabletAndDesktop } from "components/layout/ScreenViewSize";
import AuthContext from "utils/AuthContext";
import DeleteEstablishment from "utils/DeleteEstablishment";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Tooltip from "@mui/material/Tooltip";

function Establishments({ establishments, loading, error }) {
  const [auth] = useContext(AuthContext);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  if (!auth) {
    navigate("/login");
  }

  async function handleDelete(id) {
    const deleteThis = window.confirm(
      "This will delete this establishment forever. Are you sure?"
    );

    if (deleteThis) {
      const deleteEst = await DeleteEstablishment(id, auth.jwt);
      if (deleteEst.success) {
        setDeleted(true);
        setTimeout(() => {
          window.location.reload(true);
        }, 2000);
      } else {
        setDeleted(false);
      }
    }
  }

  if (loading) {
    return (
      <MyLoader height="100vh">Loading Establishments, Please wait...</MyLoader>
    );
  }

  if (error) {
    return (
      <AlertMessage
        variant="error"
        title="Error"
        message="An error occured, Please try again later"
      />
    );
  }

  if (!establishments) {
    return <div>No Establishments available</div>;
  }

  return (
    <Layout>
      <Head
        page="Admin - Establishments"
        description="Holidaze Admin - View of your current establishments"
      />
      <OuterContainer>
        <AdminHeader
          heading="Establishments"
          icon={<AddIcon />}
          iconToolTip="Add New"
          iconLink="/addestablishment"
          fixed={"fixed-button"}
        >
          <TabletAndDesktop>
            {deleted && (
              <AlertMessage
                width="100px"
                variant="info"
                title="Deleted"
                message="Establishment successfully deleted"
              />
            )}
          </TabletAndDesktop>
        </AdminHeader>
        <Box className="admin-grid" sx={{ flexGrow: 1, position: "relative" }}>
          <Mobile>
            {deleted && (
              <div className="delete-alert">
                <AlertMessage
                  width="100px"
                  variant="info"
                  title="Deleted"
                  message="Establishment successfully deleted"
                />
              </div>
            )}
          </Mobile>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            {[...establishments]
              .sort((b, a) => a.id - b.id)
              .map((item, index) => {
                const { title, address, type, updatedAt } = item.attributes;
                const image = item.attributes.images.data[0].attributes.url;
                const formatDate = (value, locale = "en-GB") => {
                  return new Date(value).toLocaleDateString(locale);
                };
                return (
                  <Grid item xs={2} sm={4} md={4} key={item.id}>
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
                      <Tooltip title="Delete">
                        <DeleteRoundedIcon
                          onClick={() => handleDelete(item.id)}
                          className="admin-card__delete"
                        />
                      </Tooltip>
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
