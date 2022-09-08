import "./details.scss";
import React from "react";
import Head from "../../components/layout/Head";
import OuterContainer from "../../components/layout/OuterContainer";
import ImageGrid from "components/ImageGrid";
import Heading from "components/typography/Heading";
import Paragraph from "components/typography/Paragraph";
import LineBreak from "components/layout/LineBreak";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FacebookShareButton } from "react-share";

function Details() {
    const shareUrl = window.location.href;

  return (
    <>
      <Head
        page="Accommodation"
        description="Holidaze - Search for accommodations in Bergen city center and sourrounding areas"
      />
      <OuterContainer>
          <main>
              <ImageGrid />
              <div className="details__header">
                  <div className="details__header--top">
              <Heading level={1} mb={0}>Augustin Hotel</Heading>
              <FacebookShareButton url={shareUrl}><FontAwesomeIcon icon={faShareFromSquare} /> </FacebookShareButton>
              </div>
              <Paragraph>C. Sundtsgate 22-24, 5004 Bergen - <a href="#">Show map</a></Paragraph>
              <LineBreak borderColor={"#707070"} opacity={.7} borderWidth={"1px"} />
              </div>
          </main>
        </OuterContainer>
    </>
  );
}

export default Details;
