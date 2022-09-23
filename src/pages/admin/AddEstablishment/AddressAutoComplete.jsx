import React from "react";
import TextField from "@mui/material/TextField";
import { useRef, useEffect } from "react";

function AddressAutoComplete() {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "no" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["address"],
  };
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
  }, []);

  return (
    <TextField
      label={"Address"}
      id="address"
      variant={"outlined"}
      type="text"
      placeholder="Street address..."
      inputRef={inputRef}
    />
  );
}

export default AddressAutoComplete;
