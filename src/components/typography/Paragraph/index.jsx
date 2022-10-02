import PropTypes from "prop-types";

const Paragraph = ({ children, fontSize, color, textWidth }) => {
  const Style = {
    fontSize: fontSize + "rem",
    color: color,
    maxWidth: textWidth,
  };

  return <p style={Style}>{children}</p>;
};

Paragraph.propTypes = {
  children: PropTypes.any,
  fontSize: PropTypes.number,
  color: PropTypes.string,
  textWidth: PropTypes.number,
};

export default Paragraph;
