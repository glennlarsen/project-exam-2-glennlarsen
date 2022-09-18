import React from "react";
import "./footer.scss";
import LineBreak from "../../layout/LineBreak";
import logo from "../../../logo/HoliDaze-small.png";
import Paragraph from "../../typography/Paragraph";
import OuterContainer from "../../layout/OuterContainer";
import SocialMedia from "components/SocialMedia";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <OuterContainer>
    <footer>
      <LineBreak />
      <div className="footer__content">
      <div className="footer__content--links">
        <span>Links</span>
        <Link to="/">Home</Link>
        <Link to="/accommodation">Accommodation</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </div>
      <div className="footer__content--contact">
        <span>Contact Info</span>
        <address>+47 91771028</address>
        <address>support@holidaze.com</address>
        <address>Vestre Holbergsallmenningen 10</address>
        <address>5011 Bergen, Norway</address>
      </div>
      <div className="footer__content--logo">
        <img src={logo} alt="Holidaze Logo" />
        <Paragraph>
          The best portal to find and contact hotels, B&B's and Guesthouses in
          Bergen and the surrounding area{" "}
        </Paragraph>
        <SocialMedia />
      </div>
      </div>
      <LineBreak />
      <p className="footer__copyright">Copyright ©HoliDaze 2022. All rights reserved.</p>
    </footer>
    </OuterContainer>
  );
}

export default Footer;
