import React, { useState } from "react";
import Heading from "components/typography/Heading";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Grid from '@mui/material/Unstable_Grid2';
import useApi from "utils/useApi";
import { BASE_URL, FACILITIES } from "utils/api";

function AddFacilities({register}) {
  const url = BASE_URL + FACILITIES;
  const { facilities, loading, error } = useApi(url);
  const [showAllFacilities, setShowAllFacilities] = useState(false);

  const toogleAllFacilities = (event) => {
    setShowAllFacilities((current) => !current);
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
        {facilities.map(facility => {
          const { name, tags } = facility.attributes;
          return (
            <FormControlLabel
              sx={{minWidth: "170px"}}
              key={facility.id}
              id={tags}
              name={`facilities[${facility.id}]`}
              value={facility.id}
              control={<Checkbox />}
              label={name}
              inputRef={register}
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
