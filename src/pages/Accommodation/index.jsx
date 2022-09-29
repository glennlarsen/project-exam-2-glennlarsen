import React from "react";
import "./accommodation.scss";
import Layout from "components/layout/Layout";
import OuterContainer from "../../components/layout/OuterContainer";
import Head from "../../components/layout/Head";
import Searchbox from "../../components/Searchbox";
import { Mobile, TabletAndDesktop } from "components/layout/ScreenViewSize";
import Listings from "../../components/Listings";
import { useParams } from "react-router-dom";

function Accommodation({ establishments, loading, error }) {
  const { type } = useParams();
  const noEstablishments = (
    <div style={{ height: "130px", marginTop: "13em" }}>
      No listings available
    </div>
  );

  return (
    <Layout>
      <Head
        page="Accommodation"
        description="Holidaze - Search for accommodations in Bergen city center and sourrounding areas"
      />
      <OuterContainer>
        <main>
          {establishments ? (
            <>
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
            </>
          ) : (
            noEstablishments
          )}
        </main>
      </OuterContainer>
    </Layout>
  );
}

export default Accommodation;
