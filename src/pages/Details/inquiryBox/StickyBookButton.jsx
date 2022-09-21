import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "components/forms/Button";


const StickyBookButton = ({ onClick }) => (
<div className="floating-contact">
    <div className="floating-contact__text">
        <span><span className="floating-contact__text--price">From 1992 NOK </span>per night</span>
        <div>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </div>
    </div>
    <Button onClick={onClick} type={"btn-floating"}>Book</Button>
</div>
)

export default StickyBookButton;