import React from "react";
import "./accommodation.scss";
import Layout from "components/layout/Layout";
import OuterContainer from "../../components/layout/OuterContainer";
import Head from "../../components/layout/Head";
import Searchbox from "../../components/Searchbox";
import { useMediaQuery } from "react-responsive";
import Listings from "../../components/Listings";

function Accommodation() {
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 829 });
    return isMobile ? children : null;
  };

  const TabletAndDesktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 830 });
    return isTablet ? children : null;
  };

  return (
    <Layout>
        <Head
          page="Accommodation"
          description="Holidaze - Search for accommodations in Bergen city center and sourrounding areas"
        />
        <OuterContainer>
          <main>
          <Mobile>
          <Searchbox dropdownStatus={true}  />
          </Mobile>
          <TabletAndDesktop>
          <Searchbox maxWidth={"none"} width={100} />
          </TabletAndDesktop>
          <div className="accommodations"></div>
          <Listings numberOfCards={20} />
          </main>
        </OuterContainer>
    </Layout>
  );
}

export default Accommodation;
