import "./navigation.scss";
import { bubble as Menu } from "react-burger-menu";
import { useState, useContext } from "react";
import AuthContext from "utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from "../../../logo/HoliDaze-small.png";
import NavLinksDesktop from "./NavLinksDesktop";
import burger from "./bars-solid.svg";
import Heading from "components/typography/Heading";
import { TabletAndDesktop, Mobile } from "../ScreenViewSize";
import AdminMenu from "./AdminMenu";

const Navigation = () => {
  const [menuState, setMenuState] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  const closeMenu = () => {
    setMenuState(false);
  };

  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    navigate("/");
  }

  return (
    <>
      <Mobile>
        <NavLink to="/">
          <img src={logo} alt="Holidaze logo" className="logo logo-navbar" />
        </NavLink>
        <Menu
          width={320}
          right
          customBurgerIcon={<img src={burger} />}
          isOpen={menuState}
        >
          <Heading level={1} color={"#17396D"}>
            Menu
          </Heading>
          <NavLink to="/" onClick={() => closeMenu()} className="nav__link">
            Home
          </NavLink>
          <NavLink
            to="/accommodation"
            onClick={() => closeMenu()}
            className="nav__link"
          >
            Accommodation
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => closeMenu()}
            className="nav__link"
          >
            Contact
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
