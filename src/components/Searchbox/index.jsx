import React from "react";
import { useState } from "react";
import "./searchbox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL, ESTABLISHMENTS } from "../../utils/api";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import useApi from "../../utils/useApi";

function Searchbox({ maxWidth, width, dropdownStatus }) {
  const Style = {
    maxWidth: maxWidth,
    width: width + "%",
  };

  const [showDropdown] = useState(dropdownStatus);
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const categories = (
    <>
      {" "}
      <span className="searchbox__category--title">View By Catgeory</span>
      <div className="searchbox__circles">
        <div className="searchbox__circles--small">
          <a href="/accommodation" className="searchbox__circle">
            Hotel
          </a>
          <a href="/accommodation" className="searchbox__circle">
            B&B
          </a>
          <a href="/accommodation" className="searchbox__circle">
            <span>Guest</span>
            <span>house</span>
          </a>
        </div>
        <a href="/accommodation" className="searchbox__circle--filled">
          View All
        </a>
      </div>
    </>
  );

  const dropDown = !isShown ? (
    <FontAwesomeIcon onClick={handleClick} icon={faChevronDown} size="2x" />
  ) : (
    isShown && (
      <div className="searchbox__category">
        {categories}
        <FontAwesomeIcon onClick={handleClick} icon={faChevronUp} size="2x" />
      </div>
    )
  );

  const url = BASE_URL + ESTABLISHMENTS;
  const { establishments, loading, error } = useApi(url);

  console.log(establishments);



  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <div className="searchbox__results">
          <span className="searchbox__results--title">{item.attributes.title}</span> 
          <span className="searchbox__results--type">{item.attributes.address}</span>
        </div>
      </>
    );
  };

  const styling = {
    zIndex: "100",
  };

  return (
    <div style={Style} className="searchbox">
      <div className="searchbox__container">
        <label htmlFor="search" className="searchbox__label">
          Search for Accommodation
        </label>
        <ReactSearchAutocomplete
          items={establishments}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          formatResult={formatResult}
          placeholder="Search for a hotel..."
          maxResults={5}
          autoFocus
          styling={styling}
          fuseOptions={{ keys: ["attributes.title", "attributes.address" ] }}
          resultStringKeyName="attributes.title"
        />
      </div>
      {showDropdown ? (
        dropDown
      ) : (
        <div className="searchbox__category">{categories}</div>
      )}
    </div>
  );
}

export default Searchbox;
