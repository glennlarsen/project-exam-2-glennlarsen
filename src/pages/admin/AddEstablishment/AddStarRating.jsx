import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function AddStarRating() {
  const [starValue, setStarValue] = useState(1);
  return (
    <FormControl>
      <FormLabel id="breakfast-row-radio-buttons-group-label">
        Star Rating
      </FormLabel>
      <Rating
        size="large"
        name="simple-controlled"
        sx={{
          "& .MuiRating-iconFilled": {
            color: "black",
          },
          "& .MuiRating-iconHover": {
            color: "black",
          },
        }}
        value={starValue}
        defaultValue={starValue}
        onChange={(event, newValue) => {
          setStarValue(newValue);
        }}
      />
    </FormControl>
  );
}

export default AddStarRating;
