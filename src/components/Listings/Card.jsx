import React from "react";
import { Link } from "react-router-dom";
import styles from "./listings.module.scss";
import Heading from "../typography/Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@iconify/react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function Card({ establishments, numberOfCards, loading, type }) {
  const category = type;
  const accommodations = establishments;
  const filteredEstablishments = accommodations.filter((item) =>
    item.attributes.type.toLowerCase().includes(category)
  );

  if (loading) {
    return Array.from(new Array(numberOfCards)).map((skeletonItem, index) => (
      <Box key={index} sx={{ width: "90%" }}>
        <Skeleton height={250} sx={{ marginTop: "-45px" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "-35px",
            marginBottom: "40px",
          }}
        >
          <div className={styles.skeletonText}>
            <Skeleton width="50%" />
            <Skeleton width="30%" />
            <Skeleton width="80%" />
          </div>
          <div>
            <Skeleton
              animation="wave"
              variant="circular"
              width={60}
              height={60}
            />
          </div>
        </Box>
      </Box>
    ));
  }

  if (category && filteredEstablishments.length === 0) {
    return (
      <div style={{ height: "130px", marginTop: "13em" }}>
        No listings in this category available
      </div>
    );
  }

  return (
    <>
      {(category ? filteredEstablishments : accommodations)
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
            <Link
              key={item.id}
              to={`details/${item.id}`}
              className={styles.card}
            >
              <div className={styles.cardImage}>
                <img
                  src={image ? image : "https://via.placeholder.com/600"}
                  alt={title}
                />
                <div className={styles.cardTitle}>
                  <Heading level={3}>{title}</Heading>
                </div>
              </div>
              <div className={styles.cardDetails}>
                <span>
                  {price.toLocaleString().replace(/,/g, " ")} NOK per day
                </span>
                <div>{numberOfStars}</div>
                <p>{address}</p>
                <div className={styles.cardCircle}>
                  <Icon
                    icon="entypo-social:tripadvisor"
                    color="#3474d4"
                    width="35"
                    height="35"
                  />
                  <span>{rating.toFixed(1)}</span>
                </div>
              </div>
            </Link>
          );
        })}
    </>
  );
}

export default Card;
