import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../logo/HoliDaze-small.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

function NavLinksDesktop({ auth, logout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <NavLink to="/">
        <img src={logo} alt="Holidaze logo" className="logo logo-navbar" />
      </NavLink>
      <div className="navbar__links">
        <NavLink to="/" className="nav__link">
          Home
        </NavLink>
        <NavLink to="/accommodation" className="nav__link">
          Accommodations
        </NavLink>
        <NavLink to="/contact" className="nav__link">
          Contact
        </NavLink>
        {auth ? (
          <>
            <Tooltip title={`User: ${auth.user.username}`}>
              <button
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                className="btn-navigation"
                onClick={handleClick}
              >
                Admin
              </button>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <NavLink to="/establishments">Establishments</NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/messages">Messages</NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/enquiries">Enquiries</NavLink>
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <NavLink to="/login" className="btn-navigation">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default NavLinksDesktop;
