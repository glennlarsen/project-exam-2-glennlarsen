import React from "react";
import styles from "./inquiry.module.scss";

const StickyBookButton = ({ onClick, price, stars }) => (
  <div className={styles.floatingButton}>
    <div className={styles.floatingButtonText}>
      <span>
        <span className={styles.floatingButtonPrice}>From {price} NOK </span>
        per night
      </span>
      <div>{stars}</div>
    </div>
    <button onClick={onClick} className="btn-floating">
      Book
    </button>
  </div>
);

export default StickyBookButton;
