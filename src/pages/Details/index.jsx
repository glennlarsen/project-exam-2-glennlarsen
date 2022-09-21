import "./details.scss";
import React from "react";
import Layout from "components/layout/Layout";
import Head from "components/layout/Head";
import { Mobile, TabletAndDesktop } from "components/layout/ScreenViewSize";
import OuterContainer from "components/layout/OuterContainer";
import DetailsHeader from "./DetailsHeader";
import LineBreak from "components/layout/LineBreak";
import Paragraph from "components/typography/Paragraph";
import Facilities from "./facilities/Facilities";
import Map from "./map/Map";
import Inquiry from "./inquiryBox/Inquiry";
import ImageCarouselGallery from "./ImageCarouselGallery";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "utils/useApi";
import { BASE_URL, ESTABLISHMENTS, POPULATE_ALL } from "utils/api";
import MyLoader from "../../components/layout/MyLoader";

function Details() {
  const shareUrl = window.location.href;

  let navigate = useNavigate();

  const { id } = useParams();

  console.log(id)

  if (!id) {
    navigate("/");
  }

  const url = BASE_URL + ESTABLISHMENTS + "/" + id + POPULATE_ALL;
  const { establishment, loading, error } = useApi(url);

  console.log(establishment);

  if (loading)
  return (
    <div className="loader-container">
      <MyLoader />
    </div>
  );

if (error) {
  return <div>{error}</div>;
}

const { title, price, address, stars, rating, tripadvisorlink, about, breakfast, facilitiess, images } = establishment.attributes;
const facilities = facilitiess.data;
const itemImages = images.data;

  return (
    <Layout>
      <Head
        page="Accommodation"
        description="Holidaze - Search for accommodations in Bergen city center and sourrounding areas"
      />
      <OuterContainer>
        <main>
          <ImageCarouselGallery items={itemImages} />
          <div className="details">
            <div className="details__info">
              <div>
                <DetailsHeader title={title} address={address} url={shareUrl} />
                <LineBreak
                  borderColor={"#707070"}
                  opacity={0.7}
                  borderWidth={"1px"}
                />
                <div>
                  <Paragraph>
                    {about}
                  </Paragraph>
                </div>
                <LineBreak
                  borderColor={"#707070"}
                  opacity={0.7}
                  borderWidth={"1px"}
                />
                <Facilities facilities={facilities} heading={"Facilities"} />
              </div>
              <TabletAndDesktop>
                <Inquiry title={title} breakfast={breakfast} rating={rating} stars={stars} price={price} tripLink={tripadvisorlink} />
              </TabletAndDesktop>
            </div>
            <LineBreak
              borderColor={"#707070"}
              opacity={0.7}
              borderWidth={"1px"}
            />
          </div>
          <Map
            heading={"Map"}
            location={address}
            zoomLevel={16}
          />
          <Mobile>
            <Inquiry title={title} breakfast={breakfast} rating={rating} stars={stars} price={price} tripLink={tripadvisorlink} />
          </Mobile>
        </main>
      </OuterContainer>
    </Layout>
  );
}

export default Details;
