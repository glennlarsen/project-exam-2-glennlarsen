import React, { useState } from "react";
import "./contact.scss";
import Layout from "components/layout/Layout";
import OuterContainer from "../../components/layout/OuterContainer";
import Head from "../../components/layout/Head";
import Header from "components/layout/Header";
import contactBackground from "./contact-background.jpg";
import Heading from "components/typography/Heading";
import SocialMedia from "components/SocialMedia";
import ContactForm from "./ContactForm";

function Contact() {

  return (
    <Layout>
      <Head
        page="Contact"
        description="Holidaze - Contact us by filling the form, send us an email or give us a call"
      />
      <OuterContainer>
        <Header image={contactBackground}>
          <div className="header__container">
            <Heading level={1} color={"white"} textWidth={320}>
              Contact Us
            </Heading>
            <address>+47 91771028</address>
            <a href="mailto:support@holidaze.com?subject=Contact Holidaze">support@holidaze.com</a>
            <SocialMedia size={40} borderColor={"#17396D"} color={"#17396D"} />
          </div>
          <ContactForm />
        </Header>
        <main className="main-contact"></main>
      </OuterContainer>
    </Layout>
  );
}

export default Contact;
