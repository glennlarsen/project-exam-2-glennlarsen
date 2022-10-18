import React from "react";
import styles from "./home.module.scss";
import background from "./background.jpg";
import tripadvisor from "./tripadvisor-logo.png";

import Layout from "components/layout/Layout";
import Head from "components/layout/Head";
import Heading from "components/typography/Heading";
import Paragraph from "components/typography/Paragraph";
import OuterContainer from "components/layout/OuterContainer";
import { TabletAndDesktop } from "components/layout/ScreenViewSize";
import Header from "components/layout/Header";
import Searchbox from "components/Searchbox";
import Listings from "components/Listings";

function Home({ establishments, loading, error }) {
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
            <div className={styles.headerIcon}>
              <div className={styles.headerCircle}>
                <img src={tripadvisor} />
                certified
              </div>
              <span className={styles.headerIconText}>Tripadvisor</span>
            </div>
          </div>
          <Searchbox establishments={establishments} />
        </Header>
        <main className={styles.mainHome}>
          <Heading level={2}>Popular Hotels</Heading>
          <div className={styles.popular}>
            <Listings
              establishments={establishments}
              loading={loading}
              error={error}
              MobileAndDesktopNumberOfCards={3}
              tabletNumberOfCards={2}
              type="hotel"
            />
          </div>
        </main>
      </OuterContainer>
    </Layout>
  );
}

export default Home;
