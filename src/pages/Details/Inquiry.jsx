import React, { useState } from "react";
import { Icon } from "@iconify/react";
import DropDown from "components/forms/Dropdown";
import Button from "components/forms/Button";
import RangeDatePicker from "components/forms/RangeDatePicker";
import FloatingContact from "./FloatingContact";
import { HideOn } from "react-hide-on-scroll";
import BookingModal from "./BookingModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Inquiry = ({ price, tripLink, stars, rating, breakfast }) => {
  const [value, setValue] = useState([null, null]);

  const handleValue = (newValue) => {
    setValue(newValue);
  };

  const [guests, setGuests] = useState(1);

  const handleChange = (event) => {
    event.preventDefault();
    setGuests(event.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  let numberOfStars = [];
          for (let i = 0; i < stars; i++) {
            numberOfStars.push(
              <FontAwesomeIcon key={numberOfStars} icon={faStar} />
            );
          }

  return (
    <div className="inquiry__container">
      <div className="inquiry__box" id="inquiryBox">
        <div className="inquiry__box--text">
          <span>
            <span className="inquiry__box--price">From {price} NOK</span> per
            night
          </span>
          <div>
            {numberOfStars}
          </div>
          <span className="inquiry__box--breakfast">{breakfast ? "Breakfast Included" : "Breakfast not Included"}</span>
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
          <a href={tripLink}>
            <span>Reviews</span>
          </a>
        </div>
        <div className="inquiry__box--form">
          <RangeDatePicker value={value} onChange={handleValue} />
          <DropDown guests={guests} onChange={handleChange} />
        </div>
        <Button onClick={handleOpen}>Book</Button>
        <HideOn divID="map">
          <FloatingContact onClick={handleOpen} />
        </HideOn>
        <BookingModal
          dateChange={handleValue}
          value={value}
          onChange={handleChange}
          guests={guests}
          open={open}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};

export default Inquiry;
