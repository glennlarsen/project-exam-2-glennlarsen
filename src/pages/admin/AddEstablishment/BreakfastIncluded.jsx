import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const BreakfastIncluded = () => (
    <FormControl>
      <FormLabel id="breakfast-row-radio-buttons-group-label">
        Breakfast Included
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="breakfast-radio-buttons-group-label"
        name="breakfast-radio-buttons-group"
        defaultValue={true}
      >
        <FormControlLabel value={true} control={<Radio />} label="Yes" />
        <FormControlLabel value={false} control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
);

export default BreakfastIncluded;
