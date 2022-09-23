import PropTypes from "prop-types";

const Heading = ({ level, children, color, textWidth, mb }) => {
  const Level = "h" + level;
  const Style = {
    color: color,
    maxWidth: textWidth,
    marginBottom: mb + "em",
  }
 
  return <Level style={Style}>{children}</Level>;
};

Heading.propTypes = {
  children: PropTypes.any,
  level: PropTypes.number,
  color: PropTypes.string,
  textWidth: PropTypes.number,
  mb: PropTypes.number,
};

export default Heading;
