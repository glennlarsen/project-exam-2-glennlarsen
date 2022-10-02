import React from "react";
import { Link } from "react-router-dom";
import styles from "./footer.module.scss";
import logo from "logo/HoliDaze-small.png";
import LineBreak from "components/layout/LineBreak";
import Paragraph from "components/typography/Paragraph";
import OuterContainer from "components/layout/OuterContainer";
import SocialMedia from "components/SocialMedia";

function Footer() {
  return (
    <OuterContainer>
      <footer className={styles.footer}>
        <LineBreak />
        <div className={styles.footerContent}>
          <div className={styles.footerContentLinks}>
            <span>Links</span>
            <Link to="/">Home</Link>
            <Link to="/accommodation">Accommodation</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login</Link>
          </div>
          <div className={styles.footerContentContact}>
            <span>Contact Info</span>
            <address>+47 91771028</address>
            <address>support@holidaze.com</address>
            <address>Vestre Holbergsallmenningen 10</address>
            <address>5011 Bergen, Norway</address>
          </div>
          <div className={styles.footerContentLogo}>
            <img src={logo} alt="Holidaze Logo" />
            <Paragraph>
              The best portal to find and contact hotels, B&B's and Guesthouses
              in Bergen and the surrounding area{" "}
            </Paragraph>
            <SocialMedia />
          </div>
        </div>
        <LineBreak />
        <p className={styles.footerCopyright}>
          Copyright ©HoliDaze 2022. All rights reserved.
        </p>
      </footer>
    </OuterContainer>
  );
}

export default Footer;
