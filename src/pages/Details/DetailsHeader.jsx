import React from "react";
import "./details.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FacebookShareButton } from "react-share";
import Heading from "components/typography/Heading";
import Paragraph from "components/typography/Paragraph";
import { Link, animateScroll as scroll } from "react-scroll";
import Tooltip from '@mui/material/Tooltip';

function DetailsHeader({ url, title, address }) {
  return (
    <div className="details__header">
      <div className="details__header--top">
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
        <Link className="map-link" activeClass="active" to="map" smooth={true} duration={500} offset={-70}>
          Show map
        </Link>
      </Paragraph>
    </div>
  );
}

export default DetailsHeader;
