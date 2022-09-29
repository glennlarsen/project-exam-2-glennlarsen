import Loader from "react-loaders";
import "./myLoader.scss";

const MyLoader = ({children, centered}) => {

  const centerStyle = {
    height: centered
  }

  return (
    <div style={centerStyle} className="loader-container">
      <Loader type="ball-clip-rotate" />
      <span>{children}</span>
    </div>
  );
};

export default MyLoader;
