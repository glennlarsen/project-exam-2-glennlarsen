import React from "react";
import "./footer.scss";
import LineBreak from "../../layout/LineBreak";
import logo from "../../../logo/HoliDaze-small.png";
import Paragraph from "../../typography/Paragraph";
import OuterContainer from "../../layout/OuterContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";


function Footer() {
  return (
    <OuterContainer>
    <footer>
      <LineBreak />
      <div className="footer__content">
      <div className="footer__content--links">
        <span>Links</span>
        <a href="/">Home</a>
        <a href="/accommodation">Accommodation</a>
        <a href="/contact">Contact</a>
        <a href="/login">Login</a>
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
        <div className="footer__content--social">
          <div className="footer__content__social--circle"><FontAwesomeIcon icon={faFacebookF} /></div>
          <div className="footer__content__social--circle"><FontAwesomeIcon icon={faInstagram} /></div>
          <div className="footer__content__social--circle"><FontAwesomeIcon icon={faTwitter} /></div>
          <div className="footer__content__social--circle"><FontAwesomeIcon icon={faLinkedinIn} /></div>
        </div>
      </div>
      </div>
      <LineBreak />
      <p className="footer__copyright">Copyright ©HoliDaze 2022. All rights reserved.</p>
    </footer>
    </OuterContainer>
  );
}

export default Footer;
