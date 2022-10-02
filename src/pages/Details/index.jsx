import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./details.module.scss";
import Layout from "components/layout/Layout";
import Head from "components/layout/Head";
import { Mobile, TabletAndDesktop } from "components/layout/ScreenViewSize";
import OuterContainer from "components/layout/OuterContainer";
import LineBreak from "components/layout/LineBreak";
import Paragraph from "components/typography/Paragraph";
import MyLoader from "components/layout/MyLoader";
import AlertMessage from "components/forms/AlertMessage";
import Facilities from "./facilities/Facilities";
import DetailsHeader from "./detailsHeader/DetailsHeader";
import Map from "./map/Map";
import Inquiry from "./inquiryBox/Inquiry";
import ImageCarouselGallery from "./ImageCarouselGallery";
import useApi from "utils/useApi";
import { BASE_URL, ESTABLISHMENTS, POPULATE_ALL } from "constants/apiKeys";

function Details() {
  const shareUrl = window.location.href;
  const { id } = useParams();

  let navigate = useNavigate();
  if (!id) {
    navigate("/");
  }

  const url = BASE_URL + ESTABLISHMENTS + "/" + id + POPULATE_ALL;
  const { establishment, loading, error } = useApi(url);

  if (loading) return <MyLoader height="100vh">Loading accommodation, Please wait...</MyLoader>;

  if (error) {
    return (
      <AlertMessage
        variant="error"
        title="Error"
        message="An error occured, Please try again later"
      />
    );
  }

  const {
    title,
    price,
    address,
    stars,
    rating,
    tripadvisorlink,
    about,
    breakfast,
    facilitiess,
    images,
  } = establishment.attributes;
  const facilities = facilitiess.data;
  const itemImages = images.data;

  return (
    <Layout>
      <Head
        page={title}
        description="Holidaze - Search for accommodations in Bergen city center and sourrounding areas"
      />
      <OuterContainer>
        <main>
          <ImageCarouselGallery items={itemImages} />
          <div className={styles.details}>
            <div className={styles.detailsInfo}>
              <div>
                <DetailsHeader title={title} address={address} url={shareUrl} />
                <LineBreak
                  borderColor={"#707070"}
                  opacity={0.7}
                  borderWidth={"1px"}
                />
                <div>
                  <Paragraph>{about}</Paragraph>
                </div>
                <LineBreak
                  borderColor={"#707070"}
                  opacity={0.7}
                  borderWidth={"1px"}
                />
                <Facilities facilities={facilities} heading={"Facilities"} />
              </div>
              <TabletAndDesktop>
                <Inquiry
                  id={id}
                  title={title}
                  breakfast={breakfast}
                  rating={rating}
                  stars={stars}
                  price={price}
                  tripLink={tripadvisorlink}
                />
              </TabletAndDesktop>
            </div>
            <LineBreak
              borderColor={"#707070"}
              opacity={0.7}
              borderWidth={"1px"}
            />
          </div>
          <Map heading="Map" location={address} zoomLevel={16} />
          <Mobile>
            <Inquiry
              id={id}
              title={title}
              breakfast={breakfast}
              rating={rating}
              stars={stars}
              price={price}
              tripLink={tripadvisorlink}
            />
          </Mobile>
        </main>
      </OuterContainer>
    </Layout>
  );
}

export default Details;
