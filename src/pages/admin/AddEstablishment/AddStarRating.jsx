import React from "react";
import Rating from "@mui/material/Rating";
import { FormGroup } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import { Controller } from "react-hook-form";

const AddStarRating = ({control}) => (
  <FormGroup>
    <FormLabel>Star Rating</FormLabel>
    <Controller
      render={({ field: { onChange, value } }) => (
        <Rating
          value={Number(value)}
          onChange={onChange}
          size="large"
          sx={{
            "& .MuiRating-iconFilled": {
              color: "black",
            },
            "& .MuiRating-iconHover": {
              color: "black",
            },
          }}
        />
      )}
      name="starsRating"
      control={control}
      defaultValue={1}
      onChange={([, value]) => value}
    />
  </FormGroup>
);
export default AddStarRating;
