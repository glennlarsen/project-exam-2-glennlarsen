import React from "react";
import styles from "./facilities.module.scss";
import FacilityIcon from "./FacilityIcon";
import Heading from "components/typography/Heading";

function Facilities({ heading, facilities }) {
  const facilitiesArray = facilities;
  const noFacilities = facilitiesArray.length === 0;

  return (
    <>
      <Heading level={2}>{heading}</Heading>
      {noFacilities ? (
        <span>No Facilities available</span>
      ) : (
        <div className={styles.facilities}>
          {facilitiesArray.map((facility) => {
            const { name, tags } = facility.attributes;
            return (
              <div key={facility.id} className={styles.facilitiesItem}>
                <FacilityIcon tags={[tags]} />
                <span>{name}</span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Facilities;
