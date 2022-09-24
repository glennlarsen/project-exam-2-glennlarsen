import React, { useState } from "react";
import Rating from "@mui/material/Rating";

function AddStarRating() {
  const [starValue, setStarValue] = useState(1);
  return (
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
  );
}

export default AddStarRating;
