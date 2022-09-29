import { BASE_URL, MESSAGES } from "utils/api";
import axios from "axios";

async function PostMessage(data) {
  const formData = new FormData();

  const newMessage = {
    name: data.name,
    email: data.email,
    phone: data.phone | "",
    message: data.message,
  };

  console.log(data);
  formData.append("data", JSON.stringify(newMessage));
  console.log(formData);

  const options = {
    method: "POST",
    data: formData,
    url: BASE_URL + MESSAGES,
  };

  console.log(options);

  try {
    const response = await axios(options);
    const data = response.data;
    console.log(data);
    if (data) {
      return { success: "Success", data: data };
    }
    if (!data) {
      return { failed: "Failed", data: data };
    }
  } catch (error) {
    console.log("error", error);
  }
}

export default PostMessage;
