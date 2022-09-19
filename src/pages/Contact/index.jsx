import React, { useState } from "react";
import "./contact.scss";
import Layout from "components/layout/Layout";
import OuterContainer from "../../components/layout/OuterContainer";
import Head from "../../components/layout/Head";
import Header from "components/layout/Header";
import contactBackground from "./contact-background.jpg";
import Heading from "components/typography/Heading";
import SocialMedia from "components/SocialMedia";
import Button from "components/forms/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputsTheme from "components/forms/InputsTheme";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: 800,
  width: "95%",
  bgcolor: "background.paper",
  borderRadius: "12px",
  gap: 2,
  boxShadow: 24,
  p: 4,
  margin: "0 auto",
};



function Contact() {

  const [textAreaValue, setTextAreaValue] = useState("");

  const handleChange = (event) => {
    setTextAreaValue(event.target.value);
  }


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
          <Box sx={boxStyle} component="form">
          <Heading level={2}>Send us a message <SendRoundedIcon sx={{ color: "#17396D", verticalAlign: "top", rotate: "-22deg", marginLeft: "0.3em" }} /></Heading>
          <InputsTheme>
              <TextField label={"Name"} variant={"outlined"} />
              <TextField label={"Email"} variant={"outlined"} type="email" />
              <TextField label={"Phone"} variant={"outlined"} type="number" />
              <TextField
                id="message"
                label="Message"
                multiline
                rows={5}
                value={textAreaValue}
                onChange={handleChange}
                placeholder="optional"
              />
            </InputsTheme>
          <Button type={"btn-form"}>Send</Button>
        </Box>
        </Header>
        <main className="main-contact"></main>
      </OuterContainer>
    </Layout>
  );
}

export default Contact;
