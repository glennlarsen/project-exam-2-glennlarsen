import Loader from "react-loaders";
import styles from "./myLoader.module.scss";

const MyLoader = ({ children, height }) => {
  const centerStyle = {
    height: height,
  };

  return (
    <div style={centerStyle} className={styles.loaderContainer}>
      <Loader type="ball-clip-rotate" />
      <span>{children}</span>
    </div>
  );
};

export default MyLoader;
