import React from "react";
import { useState } from "react";
import "./searchbox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL, ESTABLISHMENTS, POPULATE_ALL } from "../../utils/api";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import useApi from "../../utils/useApi";
import { Link } from "react-router-dom";

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
          <Link to="/accommodation" className="searchbox__circle">
            Hotel
          </Link>
          <Link to="/accommodation" className="searchbox__circle">
            B&B
          </Link>
          <Link to="/accommodation" className="searchbox__circle">
            <span>Guest</span>
            <span>house</span>
          </Link>
        </div>
        <Link to="/accommodation" className="searchbox__circle--filled">
          View All
        </Link>
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

  const url = BASE_URL + ESTABLISHMENTS + POPULATE_ALL;
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
    window.location.href = `details/${item.id}`;
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    const { title, address } = item.attributes;
    const  image  = item.attributes.images.data[0].attributes.formats.thumbnail.url;
    console.log(image)
    return (
      <Link key={item.id} to={`details/${item.id}`}>
        <div className="searchbox__results__container" >
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
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          formatResult={formatResult}
          placeholder="Search by name or address..."
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
