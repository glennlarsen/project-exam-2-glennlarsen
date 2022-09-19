import React from "react";
import { useState } from "react";
import "./searchbox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Categories from "./Categories";

function Searchbox({ establishments, maxWidth, width, dropdownStatus }) {
  const Style = {
    maxWidth: maxWidth,
    width: width + "%",
  };

  const [showDropdown] = useState(dropdownStatus);
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);
  };

  const dropDown = !isShown ? (
    <FontAwesomeIcon onClick={handleClick} icon={faChevronDown} size="2x" />
  ) : (
    isShown && (
      <div className="searchbox__category">
        <Categories />
        <FontAwesomeIcon onClick={handleClick} icon={faChevronUp} size="2x" />
      </div>
    )
  );

  const navigate = useNavigate();

  const handleOnSelect = (item) => {
    // the item selected
    navigate(`details/${item.id}`);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    const { title, address } = item.attributes;
    const image =
      item.attributes.images.data[0].attributes.formats.thumbnail.url;
    console.log(image);
    return (
      <Link key={item.id} to={`details/${item.id}`}>
        <div className="searchbox__results__container">
          <div className="searchbox__results">
            <span className="searchbox__results--title">{title}</span>
            <span className="searchbox__results--address">{address}</span>
          </div>
          <div className="searchbox__results--image">
            <img src={image} alt={title} />
          </div>
        </div>
      </Link>
    );
  };

  const styling = {
    zIndex: "100",
    borderRadius: "12px",
  };

  return (
    <div style={Style} className="searchbox">
      <div className="searchbox__container">
        <label htmlFor="search" className="searchbox__label">
          Search for Accommodation
        </label>
        <ReactSearchAutocomplete
          items={establishments}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          formatResult={formatResult}
          placeholder="Hotel name..."
          maxResults={5}
          autoFocus
          styling={styling}
          fuseOptions={{ keys: ["attributes.title", "attributes.address"] }}
          resultStringKeyName="attributes.title"
        />
      </div>
      {showDropdown ? (
        dropDown
      ) : (
        <div className="searchbox__category">
          <Categories />
        </div>
      )}
    </div>
  );
}

export default Searchbox;
