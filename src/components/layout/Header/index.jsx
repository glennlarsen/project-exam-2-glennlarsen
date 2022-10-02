import React from "react";
import styles from "./header.module.scss";

function Header({ children, image }) {
  const Style = {
    background: `linear-gradient(90deg, #3474d4 30%, rgba(242, 245, 255, 0.2) 90%, rgba(123, 66, 103, 0) 100%), url(${image}) 50% 80% / cover no-repeat`,
  };

  return (
    <div style={Style} className={styles.header}>
      {children}
    </div>
  );
}

export default Header;
