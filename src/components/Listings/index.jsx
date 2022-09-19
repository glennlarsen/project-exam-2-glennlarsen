import React from "react";
import "./listings.scss";
import Card from "./Card";
import { useMediaQuery } from "react-responsive";
import MyLoader from "../../components/layout/MyLoader";

function Listings({
  numberOfCards,
  MobileAndDesktopNumberOfCards,
  tabletNumberOfCards,
  establishments,
  loading,
  error,
  type,
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
