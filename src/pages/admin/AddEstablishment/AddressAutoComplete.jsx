import { useRef, useEffect } from "react";

const AddressAutoComplete = () => {
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
  console.log(inputRef);
  return inputRef;
};

export default AddressAutoComplete;
