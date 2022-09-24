import React, { useState } from "react";
import Heading from "components/typography/Heading";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Grid from '@mui/material/Unstable_Grid2';

function AddFacilities() {
  const [state, setState] = useState({
    Wifi: false,
    Spa: false,
    Roomservice: false,
    Pool: false,
    Petfriendly: false,
    Parking: false,
    Minibar: false,
    Laundry: false,
    Jacuzzi: false,
    Iron: false,
    Gym: false,
    Breakfast: false,
    Bathtub: false,
    AC: false,
    Frontdesk: false,
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
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        {Object.keys(state).map((item, index) => {
          return (
            <FormControlLabel
              sx={{minWidth: "170px"}}
              key={index}
              name={item}
              checked={state[item]}
              onChange={handleChange}
              control={<Checkbox />}
              label={item}
            />
          );
        })}
        </Grid>
      </FormGroup>
        {!showAllFacilities ? (
          <span className="add__facilities--expand" onClick={toogleAllFacilities}>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
            More Facilities
          </span>
        ) : (
          <span className="add__facilities--expand" onClick={toogleAllFacilities}>
            <FontAwesomeIcon icon={faChevronUp} size="1x" />
            Less Facilities
          </span>
        )}
    </>
  );
}

export default AddFacilities;
