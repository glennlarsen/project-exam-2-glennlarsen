import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../logo/HoliDaze-small.png";
import "./navigation.scss";

function NavLinks({auth, logout}) {
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
        Accommodation
      </NavLink>
      <NavLink to="/contact" className="nav__link">
        Contact
      </NavLink>
      {auth ? (
            <button className="btn-navigation" onClick={logout}>
              Log out
            </button>
          ) : (
            <NavLink
              to="/login"
              className="btn-navigation"
            >
              Login
            </NavLink>
          )}
      </div>
    </div>
  );
}

export default NavLinks;
