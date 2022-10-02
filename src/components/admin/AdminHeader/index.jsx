import React from "react";
import Heading from "components/typography/Heading";
import { NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#17396D",
    },
    secondary: {
      main: "#3474D4",
    },
  },
});

function AdminHeader({
  children,
  heading,
  icon,
  iconToolTip,
  iconLink,
  fixed,
}) {
  return (
    <ThemeProvider theme={theme}>
      <div className="admin-header">
        <Heading level={1}>{heading}</Heading>
        {children}
        <Tooltip title={iconToolTip}>
          <NavLink className={fixed} to={iconLink}>
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
