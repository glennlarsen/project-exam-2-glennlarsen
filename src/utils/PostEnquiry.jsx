import { BASE_URL, BOOKINGS, POPULATE_ALL } from "constants/apiKeys";
import axios from "axios";

async function PostEnquiry(data, establishmentId, totalPrice, days) {
  const formData = new FormData();

  const checkinDate = new Date(data.dates[0]);
  checkinDate.setDate(checkinDate.getDate() + 1);

  const checkoutDate = new Date(data.dates[1]);
  checkoutDate.setDate(checkoutDate.getDate() + 1);

  const newEnquiry = {
    name: data.name,
    email: data.email,
    comment: data.comment,
    checkin: checkinDate,
    checkout: checkoutDate,
    guests: data.guests,
    establishment: Number(establishmentId),
    price: Number(totalPrice),
    days: days,
  };

  console.log(newEnquiry)
  formData.append("data", JSON.stringify(newEnquiry));

  const options = {
    method: "POST",
    data: formData,
    url: BASE_URL + BOOKINGS + POPULATE_ALL,
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

export default PostEnquiry;
