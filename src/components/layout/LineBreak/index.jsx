import React from "react";
import styles from "./linebreak.module.scss";

function LineBreak({ borderColor, opacity, borderWidth }) {
  const Style = {
    borderColor: borderColor,
    opacity: opacity,
    borderWidth: borderWidth,
  };

  return <div style={Style} className={styles.linebreak}></div>;
}

export default LineBreak;
