import React from "react";
import "./listings.scss";
import Card from "./Card";
import { useMediaQuery } from "react-responsive";
import { BASE_URL, ESTABLISHMENTS, POPULATE_ALL } from "../../utils/api";
import useApi from "../../utils/useApi";
import MyLoader from "../../components/layout/MyLoader";


function Listings({
  numberOfCards,
  MobileAndDesktopNumberOfCards,
  tabletNumberOfCards,
}) {
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1211 });
    return isDesktop ? children : null;
  };

  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 781, maxWidth: 1210 });
    return isTablet ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 780 });
    return isMobile ? children : null;
  };

  const url = BASE_URL + ESTABLISHMENTS + POPULATE_ALL;
  const { establishments, loading, error } = useApi(url);

  if(loading) {
    return <MyLoader />
  }

  if (error) {
    return <div>An error occured</div>;
  }

  return (
    <div className="background-box">
      <div className="listings-grid">
          <Card
            establishments={establishments}
            numberOfCards={numberOfCards}
            loading={loading}
          />
        <Mobile>
          <Card
            establishments={establishments}
            numberOfCards={MobileAndDesktopNumberOfCards}
            loading={loading}
          />
        </Mobile>
        <Tablet>
          <Card
            establishments={establishments}
            numberOfCards={tabletNumberOfCards}
            loading={loading}
          />
        </Tablet>
        <Desktop>
          <Card
            establishments={establishments}
            numberOfCards={MobileAndDesktopNumberOfCards}
            loading={loading}
          />
        </Desktop>
      </div>
    </div>
  );
}

export default Listings;
