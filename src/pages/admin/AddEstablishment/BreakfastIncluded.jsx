import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Controller } from "react-hook-form";

const BreakfastIncluded = ({ control, name, defaultValue }) => (
  <FormControl>
    <FormLabel id="breakfast-row-radio-buttons-group-label">
      Breakfast Included
    </FormLabel>
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <RadioGroup {...field} row>
          <FormControlLabel value={true} control={<Radio />} label="Yes" />
          <FormControlLabel value={false} control={<Radio />} label="No" />
        </RadioGroup>
      )}
    />
  </FormControl>
);

export default BreakfastIncluded;
