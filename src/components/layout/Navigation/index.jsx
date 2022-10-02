import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import Heading from "components/typography/Heading";
import NavLinksDesktop from "./NavLinksDesktop";
import { TabletAndDesktop, Mobile } from "../ScreenViewSize";
import AdminMenu from "./AdminMenu";
import AuthContext from "utils/AuthContext";
import logo from "../../../logo/HoliDaze-small.png";
import { bubble as Menu } from "react-burger-menu";
import burger from "./bars-solid.svg";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const Navigation = () => {
  const [menuState, setMenuState] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuState(false);
  };

  function logout() {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      setAuth(null);
      navigate("/");
    } else {
      return;
    }
  }

  return (
    <>
      <Mobile>
        <NavLink to="/">
          <img src={logo} alt="Holidaze logo" className="logo-navbar" />
        </NavLink>
        <Menu
          width={310}
          right
          customBurgerIcon={<img src={burger} />}
          isOpen={menuState}
        >
          <Heading level={1} color={"#17396D"}>
            Menu
          </Heading>
          <NavLink to="/" onClick={() => closeMenu()} className="nav__link">
            <HomeRoundedIcon /> Home
          </NavLink>
          <NavLink
            to="/accommodation"
            onClick={() => closeMenu()}
            className="nav__link"
          >
            <ApartmentRoundedIcon /> Accommodations
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => closeMenu()}
            className="nav__link"
          >
            <SendRoundedIcon /> Contact
          </NavLink>
          {auth ? (
            <AdminMenu auth={auth} logout={logout} />
          ) : (
            <NavLink
              to="/login"
              onClick={() => closeMenu()}
              className="btn-navigation"
            >
              Login
            </NavLink>
          )}
        </Menu>
      </Mobile>
      <TabletAndDesktop>
        <NavLinksDesktop auth={auth} logout={logout} />
      </TabletAndDesktop>
    </>
  );
};

export default Navigation;
