import React from "react";
import "./listings.scss";
import Card from "./Card";
import MyLoader from "components/layout/MyLoader";
import { Mobile, Tablet, Desktop } from "components/layout/ScreenViewSize";

function Listings({
  numberOfCards,
  MobileAndDesktopNumberOfCards,
  tabletNumberOfCards,
  establishments,
  loading,
  error,
  type,
}) {

  if(loading) {
    return <MyLoader />
  }

  if (error) {
    return <div>An error occured</div>;
  }

  if(!establishments) {
    return <div style={{height: "130px", marginTop: "13em"}}>No listings available</div>
  }

  return (
    <div className="background-box">
      <div className="listings-grid">
          <Card
            establishments={establishments}
            numberOfCards={numberOfCards}
            loading={loading}
            type={type}
          />
        <Mobile>
          <Card
            establishments={establishments}
            numberOfCards={MobileAndDesktopNumberOfCards}
            loading={loading}
            type={type}
          />
        </Mobile>
        <Tablet>
          <Card
            establishments={establishments}
            numberOfCards={tabletNumberOfCards}
            loading={loading}
            type={type}
          />
        </Tablet>
        <Desktop>
          <Card
            establishments={establishments}
            numberOfCards={MobileAndDesktopNumberOfCards}
            loading={loading}
            type={type}
          />
        </Desktop>
      </div>
    </div>
  );
}

export default Listings;
