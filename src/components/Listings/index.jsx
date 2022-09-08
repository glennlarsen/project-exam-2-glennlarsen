import React from 'react'
import "./listings.scss";
import Card from './Card';
import { useMediaQuery } from "react-responsive";
import { BASE_URL, ESTABLISHMENTS, POPULATE_ALL } from '../../utils/api';
import useApi from "../../utils/useApi";
import MyLoader from "../../components/layout/MyLoader";


function Listings({ numberOfCards, MobileAndDesktopNumberOfCards, tabletNumberOfCards }) {

  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 1211 });
    return isTablet ? children : null;
  };

  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 781, maxWidth: 1210 });
    return isTablet ? children : null;
  };

  const Mobile = ({ children }) => {
    const isTablet = useMediaQuery({ maxWidth: 780 });
    return isTablet ? children : null;
  };

  const url = BASE_URL + ESTABLISHMENTS + POPULATE_ALL;
  const { establishments, loading, error } = useApi(url);

  if (loading)
    return (
      <div className="loader-container">
        <MyLoader />
      </div>
    );

  if (error) {
    return <div>An error occured</div>;
  }
   

  return (
      <div className='background-box'>
    <div className='listings-grid'>
    <Card establishments={establishments}
          numberOfCards={numberOfCards} />
    <Mobile>
          <Card establishments={establishments}
          numberOfCards={MobileAndDesktopNumberOfCards} />
        </Mobile>
    <Tablet>
          <Card establishments={establishments}
          numberOfCards={tabletNumberOfCards} />
        </Tablet>
      <Desktop>
        <Card
        establishments={establishments}
        numberOfCards={MobileAndDesktopNumberOfCards} />
        </Desktop>
    </div>
    </div>
  )
}

export default Listings;