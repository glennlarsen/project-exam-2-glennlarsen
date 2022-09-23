import React from "react";
import ImageGallery from "react-image-gallery";

function ImageCarouselGallery({ items }) {
  const itemsArray = items;

  const images = itemsArray.map((image) => {
    return {
      original: `${image.attributes.url}`,
      thumbnail: `${image.attributes.url}`,
    };
  });

  return <ImageGallery items={images} showIndex />;
}

export default ImageCarouselGallery;
