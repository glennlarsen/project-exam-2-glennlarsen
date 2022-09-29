import React, { useState } from "react";
import { Icon } from "@iconify/react";
import DropDown from "components/forms/Dropdown";
import Button from "components/forms/Button";
import RangeDatePicker from "components/forms/RangeDatePicker";
import FloatingContact from "./StickyBookButton";
import { HideOn } from "react-hide-on-scroll";
import BookingModal from "./BookingModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import MenuItem from "@mui/material/MenuItem";

const Inquiry = ({ price, tripLink, stars, rating, breakfast, title }) => {
  const todaysDate = new Date();
  const tomorrowsDate = new Date(todaysDate);
  tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
  const [value, setValue] = useState([todaysDate, tomorrowsDate]);

  const [dropdownValue, setDropdownValue] = useState(1);

  const handleDropChange = (event) => {
    event.preventDefault();
    setDropdownValue(event.target.value);
  };

  const handleValue = (newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  let numberOfStars = [];
  for (let i = 0; i < stars; i++) {
    numberOfStars.push(<FontAwesomeIcon key={numberOfStars} icon={faStar} />);
  }

  return (
    <div className="inquiry__container">
      <div className="inquiry__box" id="inquiryBox">
        <div className="inquiry__box--text">
          <span>
            <span className="inquiry__box--price">From {price} NOK</span> per
            night
          </span>
          <div>{numberOfStars}</div>
          <span className="inquiry__box--breakfast">
            {breakfast ? "Breakfast Included" : "Breakfast not Included"}
          </span>
        </div>
        <div className="reviews">
          <div className="inquiry__box--circle">
            <Icon
              icon="entypo-social:tripadvisor"
              color="#3474d4"
              width="35"
              height="35"
            />
            {rating.toFixed(1)}
          </div>
          {tripLink ? (
            <a href={tripLink}>
              <span>Reviews</span>
            </a>
          ) : (
            ""
          )}
        </div>
        <div className="inquiry__box--form">
          <RangeDatePicker value={value} onChange={handleValue} />
          <DropDown
            dropValue={dropdownValue}
            dropChange={handleDropChange}
            label="Guests"
          >
            <MenuItem value={1}>1 guest</MenuItem>
            <MenuItem value={2}>2 guests</MenuItem>
            <MenuItem value={3}>3 guests</MenuItem>
            <MenuItem value={4}>4 guests</MenuItem>
          </DropDown>
        </div>
        <button className="btn" onClick={handleOpen}>
          Book
        </button>
        <HideOn divID="map">
          <FloatingContact onClick={handleOpen} />
        </HideOn>
        <BookingModal
          dateChange={handleValue}
          value={value}
          open={open}
          dropValue={dropdownValue}
          dropChange={handleDropChange}
          onClose={handleClose}
          title={title}
          label="Guests"
        />
      </div>
    </div>
  );
};

export default Inquiry;
