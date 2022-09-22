import React from "react";
import { NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import Heading from "components/typography/Heading";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

function AdminHeader({heading, icon, iconToolTip, iconLink}) {
  return (
    <ThemeProvider theme={theme}>
    <div className="admin-header">
      <Heading level={1}>{heading}</Heading>
      <Tooltip title={iconToolTip}>
        <NavLink to={iconLink}>
          <Fab color="primary" aria-label="add">
            {icon}
          </Fab>
        </NavLink>
      </Tooltip>
    </div>
    </ThemeProvider>
  );
}

export default AdminHeader;
