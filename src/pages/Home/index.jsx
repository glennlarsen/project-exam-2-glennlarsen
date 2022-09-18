import React from "react";
import Layout from "components/layout/Layout";
import Head from "../../components/layout/Head";
import Heading from "../../components/typography/Heading";
import Paragraph from "../../components/typography/Paragraph";
import background from "./background.jpg";
import OuterContainer from "../../components/layout/OuterContainer";
import { useMediaQuery } from "react-responsive";
import Header from "../../components/layout/Header";
import tripadvisor from "./tripadvisor-logo.png";
import Searchbox from "../../components/Searchbox";
import Listings from "../../components/Listings";

function Home() {
  const TabletAndDesktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 830 });
    return isTablet ? children : null;
  };

  return (
    <Layout>
      <Head
        page="Home"
        description="Holidaze - Find your perfect Hotel in Bergen"
      />
      <OuterContainer>
        <Header image={background}>
          <div className="header__container">
            <Heading level={1} color={"white"} textWidth={320}>
              Find Your Perfect Hotel In Bergen
            </Heading>
            <TabletAndDesktop>
              <Paragraph color={"white"} textWidth={320}>
                Over 100 hotels in Bergen city center, close to the airport and
                by the fjords
              </Paragraph>
            </TabletAndDesktop>
            <div className="header__icon">
            <div className="header__circle"><img src={tripadvisor}/>certified</div>
            <span className="hader__icon--text">Tripadvisor</span>
            </div>
          </div>
          <Searchbox />
          </Header>
          <main className="main-home">
          <Heading level={2}>Popular Hotels</Heading>
          <div className='popular'>
          <Listings MobileAndDesktopNumberOfCards={3} tabletNumberOfCards={2} />
          </div>
          </main>
      </OuterContainer>
    </Layout>
  );
}

export default Home;
