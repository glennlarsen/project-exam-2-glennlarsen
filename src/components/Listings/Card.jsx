import React, { useState} from "react";
import Heading from "../typography/Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import tripadvisor from "./tripadvisor-blue-logo.png";
import { Link } from "react-router-dom";

function Card({ establishments, numberOfCards, loading, type }) {
  const category = type;

  return (
    <>
      {(category ? establishments
        .filter((item) => item.attributes.type.toLowerCase().includes(category))
        : establishments)
        .filter((item, idx) => idx < numberOfCards)
        .map((item) => {
          const { title, price, address, stars, rating } = item.attributes;
          const image = item.attributes.images.data[0].attributes.url;
          let numberOfStars = [];
          for (let i = 0; i < stars; i++) {
            numberOfStars.push(
              <FontAwesomeIcon key={numberOfStars} icon={faStar} />
            );
          }
          return (
            <Link key={item.id} to={`details/${item.id}`} className="card">
              <div className="card__image">
                <img src={image} alt={title} />
                <div className="card__title">
                  <Heading level={3}>{title}</Heading>
                </div>
              </div>
              <div className="card__details">
                <span>{price} NOK per day</span>
                <div>{numberOfStars}</div>
                <p>{address}</p>
                <div className="card__circle">
                  <img src={tripadvisor} alt="tripadvisor Logo" />
                  {rating.toFixed(1)}
                </div>
              </div>
            </Link>
          );
        })}
    </>
  );
}

export default Card;
