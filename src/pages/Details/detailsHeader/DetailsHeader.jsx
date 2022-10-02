import React from "react";
import styles from "./detailsHeader.module.scss";
import Heading from "components/typography/Heading";
import Paragraph from "components/typography/Paragraph";

import { Link, animateScroll as scroll } from "react-scroll";
import { FacebookShareButton } from "react-share";
import Tooltip from "@mui/material/Tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";

function DetailsHeader({ url, title, address }) {
  return (
    <div className={styles.detailsHeader}>
      <div className={styles.detailsHeaderTop}>
        <Heading level={1} mb={0}>
          {title}
        </Heading>
        <Tooltip title="Share">
          <FacebookShareButton url={url}>
            <FontAwesomeIcon icon={faShareFromSquare} />
          </FacebookShareButton>
        </Tooltip>
      </div>
      <Paragraph>
        {address} -{" "}
        <Link
          className={styles.mapLink}
          activeClass="active"
          to="map"
          smooth={true}
          duration={500}
          offset={-70}
        >
          Show map
        </Link>
      </Paragraph>
    </div>
  );
}

export default DetailsHeader;
