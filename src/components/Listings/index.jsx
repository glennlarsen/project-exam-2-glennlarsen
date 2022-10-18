import React from "react";
import styles from "./listings.module.scss";
import Card from "./Card";
import { Mobile, Tablet, Desktop } from "components/layout/ScreenViewSize";
import AlertMessage from "components/forms/AlertMessage";

function Listings({
  MobileAndDesktopNumberOfCards,
  tabletNumberOfCards,
  establishments,
  loading,
  error,
  type,
}) {
  if (error) {
    return (
      <AlertMessage
        variant="error"
        title="Error"
        message="An error occured, Please try again later"
      />
    );
  }

  return (
    <div className={styles.backgroundBox}>
      <div className={styles.listingsGrid}>
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
