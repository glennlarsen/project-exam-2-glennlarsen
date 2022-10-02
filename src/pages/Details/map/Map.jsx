import React, { useState } from "react";
import styles from "./map.module.scss";
import GoogleMapReact from "google-map-react";
import mapIcon from "./map-icon.svg";
import Heading from "components/typography/Heading";
import { MAPS_KEY } from "constants/apiKeys";
import Geocode from "react-geocode";
import { GEOCODING_KEY } from "constants/apiKeys";

const LocationPin = ({ text }) => (
  <div className={styles.pin}>
    <img src={mapIcon} />
    <p className={styles.pinText}>{text}</p>
  </div>
);

const Map = ({ location, heading, zoomLevel }) => {
  Geocode.setApiKey(GEOCODING_KEY);

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [address, setAddress] = useState(location);

  Geocode.fromAddress(address).then(
    (response) => {
      let { lat, lng } = response.results[0].geometry.location;
      setLat(lat);
      setLng(lng);
    },
    (error) => {
      console.error(error);
    }
  );

  const coorrdinates = {
    address: address,
    lat: lat,
    lng: lng,
  };
  return (
    <div className={styles.map} id="map">
      <div className={styles.mapHeading}>
        <Heading level={2}>{heading}</Heading>
      </div>
      <div className={styles.googleMap}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAPS_KEY }}
          center={coorrdinates}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={coorrdinates.lat}
            lng={coorrdinates.lng}
            text={coorrdinates.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
