import { BASE_URL, ESTABLISHMENTS, POPULATE_ALL } from "constants/apiKeys";
import axios from "axios";

async function PostEstablishment(uploadData, token) {
  const formData = new FormData();

  // Handling the images and appending them to the formData
  const images = Array.from(uploadData.images);
  images.forEach((image) => formData.append(`files.images`, image, image.name));

  const data = {
    title: uploadData.title,
    type: uploadData.type,
    price: uploadData.price,
    about: uploadData.about,
    address: uploadData.address,
    breakfast: uploadData.breakfast,
    stars: uploadData.starsRating,
    tripadvisorlink: uploadData.tripadvisorlink,
    rating: uploadData.rating,
    facilitiess: uploadData.facilities,
  };

  formData.append("data", JSON.stringify(data));

  const options = {
    method: "POST",
    data: formData,
    url: BASE_URL + ESTABLISHMENTS + POPULATE_ALL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(options);
    const data = response.data;
    if (data) {
      return { success: "Success", data: data };
    }
    if (!data) {
      return { failed: "Failed", data: data };
    }
  } catch (error) {
    return { sucess: false, error: error };
  }
}

export default PostEstablishment;
