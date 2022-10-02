import { BASE_URL, ESTABLISHMENTS } from "constants/apiKeys";
import axios from "axios";

async function DeleteEstablishment(id, token) {

  const options = {
    method: "DELETE",
    url: BASE_URL + ESTABLISHMENTS + "/" + id,
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

export default DeleteEstablishment;
