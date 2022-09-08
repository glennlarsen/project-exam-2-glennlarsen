import React from "react";

function Input({ children, maxWidth, placeholder, id }) {
  const Style = {
    maxWidth: maxWidth,
  };
  return (
    <input id={id} type="text" style={Style} placeholder={placeholder} className="input-field">
      {children}
    </input>
  );
}

export default Input;
