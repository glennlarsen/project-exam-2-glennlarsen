import { useMediaQuery } from "react-responsive";

  export const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1211 });
    return isDesktop ? children : null;
  };

  export const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 781, maxWidth: 1210 });
    return isTablet ? children : null;
  };

  export const TabletAndDesktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 830 });
    return isTablet ? children : null;
  };

  export const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 829 });
    return isMobile ? children : null;
  };