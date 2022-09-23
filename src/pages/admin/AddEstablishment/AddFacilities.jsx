import React, { useState } from "react";
import Heading from "components/typography/Heading";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function AddFacilities() {
  const [state, setState] = useState({
    wifi: false,
    spa: false,
    roomservice: false,
    pool: false,
    petfriendly: false,
    parking: false,
    minibar: false,
    laundry: false,
    jacuzzi: false,
    iron: false,
    gym: false,
    breakfast: false,
    bathtub: false,
    ac: false,
    frontdesk: false,
  });

  const [showAllFacilities, setShowAllFacilities] = useState(false);

  const toogleAllFacilities = (event) => {
    setShowAllFacilities((current) => !current);
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <FormGroup
        className={`${
          showAllFacilities ? "add__facilities--show" : ""
        } add__facilities`}
      >
        <Heading level={2}>Facilities</Heading>
        {Object.keys(state).map((item, index) => {
          return (
            <FormControlLabel
              key={index}
              name={item}
              checked={state[item]}
              onChange={handleChange}
              control={<Checkbox />}
              label={item}
            />
          );
        })}
      </FormGroup>
      {!showAllFacilities ? (
        <FontAwesomeIcon
          onClick={toogleAllFacilities}
          icon={faChevronDown}
          size="2x"
        />
      ) : (
        <FontAwesomeIcon
          onClick={toogleAllFacilities}
          icon={faChevronUp}
          size="2x"
        />
      )}
    </>
  );
}

export default AddFacilities;
