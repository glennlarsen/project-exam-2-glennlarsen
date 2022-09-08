import "./navigation.scss";
import { bubble as Menu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../logo/HoliDaze-small.png";
import NavLinks from "./NavLinks";
import burger from "./bars-solid.svg";
import Heading from "components/typography/Heading";


const Navigation = () => {
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };
  const TabletAndDesktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 830 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 829 });
    return isMobile ? children : null;
  };

  const [menuState, setMenuState] = useState(false);

  const closeMenu = () => {
    setMenuState(false);
  };

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
          onStateChange={() => setMenuState()}
        >
          <Heading level={1} color={"#17396D"}>Menu</Heading>
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
          <NavLink to="/login" onClick={() => closeMenu()} className="btn-navigation">
            Login
          </NavLink>
        </Menu>
      </Mobile>
      <TabletAndDesktop>
        <NavLinks />
      </TabletAndDesktop>
    </>
  );
};

export default Navigation;
