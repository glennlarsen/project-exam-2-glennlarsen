import Loader from "react-loaders";
import "./myLoader.scss";

const MyLoader = () => {
  return (
    <div className="loader-container">
      <Loader type="ball-clip-rotate" />
    </div>
  );
};

export default MyLoader;
