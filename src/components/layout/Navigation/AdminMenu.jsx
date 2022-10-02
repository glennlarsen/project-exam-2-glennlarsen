import React from "react";
import { NavLink } from "react-router-dom";
import useLocalStorage from "utils/UseLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";

const AdminMenu = ({ auth, logout }) => {
  const [showAdminMenu, setShowAdminMenu] = useLocalStorage("adminMenu", false);

  const toogleAdmin = (event) => {
    setShowAdminMenu((current) => !current);
  };

  return (
    <div className="admin-menu">
      <button onClick={toogleAdmin} className="admin-menu__toogle">
        <DashboardCustomizeRoundedIcon /> Admin{" "}
        {!showAdminMenu ? (
          <FontAwesomeIcon icon={faChevronDown} size="1x" />
        ) : (
          <FontAwesomeIcon icon={faChevronUp} size="1x" />
        )}
      </button>
      <div
        className={`${
          showAdminMenu ? "admin-menu__dropdown--active" : ""
        } admin-menu__dropdown`}
      >
        <NavLink to="/establishments">Establishments</NavLink>
        <NavLink to="/messages">Messages</NavLink>
        <NavLink to="/enquiries">Enquiries</NavLink>
        <span className="admin-menu__username">
          <span>User:</span> {auth.user.username}
        </span>
        <button onClick={logout} className="btn-navigation btn-logout">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminMenu;
