import React from "react";
import "./accommodation.scss";
import Layout from "components/layout/Layout";
import OuterContainer from "../../components/layout/OuterContainer";
import Head from "../../components/layout/Head";
import Searchbox from "../../components/Searchbox";
import { useMediaQuery } from "react-responsive";
import Listings from "../../components/Listings";
import { BASE_URL, ESTABLISHMENTS, POPULATE_ALL } from "utils/api";
import useApi from "utils/useApi";
import { useParams } from "react-router-dom";

function Accommodation() {
  const url = BASE_URL + ESTABLISHMENTS + POPULATE_ALL;
  const { establishments, loading, error } = useApi(url);

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 829 });
    return isMobile ? children : null;
  };

  const TabletAndDesktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 830 });
    return isTablet ? children : null;
  };

  const { type } = useParams();

  return (
    <Layout>
      <Head
        page="Accommodation"
        description="Holidaze - Search for accommodations in Bergen city center and sourrounding areas"
      />
      <OuterContainer>
        <main>
          <Mobile>
            <Searchbox dropdownStatus={true} />
          </Mobile>
          <TabletAndDesktop>
            <Searchbox
              establishments={establishments}
              maxWidth={"none"}
              width={100}
            />
          </TabletAndDesktop>
          <div className="accommodations"></div>
          <Listings
            type={type}
            establishments={establishments}
            loading={loading}
            error={error}
            numberOfCards={20}
          />
        </main>
      </OuterContainer>
    </Layout>
  );
}

export default Accommodation;
