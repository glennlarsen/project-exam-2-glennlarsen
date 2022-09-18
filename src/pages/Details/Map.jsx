import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import mapIcon from "./map-icon.svg";
import Heading from "components/typography/Heading";
import { MAPS_KEY } from "utils/api";
import Geocode from "react-geocode";
import { GEOCODING_KEY } from "utils/api";

import "./details.scss";

const LocationPin = ({ text }) => (
  <div className="pin">
    <img src={mapIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
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
    <div className="map" id="map">
      <div className="map__heading">
      <Heading level={2}>{heading}</Heading>
      </div>
      <div className="google-map">
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
