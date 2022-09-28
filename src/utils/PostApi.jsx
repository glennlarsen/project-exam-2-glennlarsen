import { BASE_URL, ESTABLISHMENTS, POPULATE_ALL } from "utils/api";
import axios from 'axios';

async function PostApi(uploadData, token) {
    const formData = new FormData();

    // Handling the images and appending them to the formData
	const images = Array.from(uploadData.images);
    console.log(images);
	images.forEach((image) =>
		formData.append(`files.images`, image, image.name)
	);
    console.log(images)

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

    console.log(data)
    formData.append("data", JSON.stringify(data));
    console.log(formData)

    const options = {
		method: "POST",
		data: formData,
        url: BASE_URL + ESTABLISHMENTS + POPULATE_ALL,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

    console.log(options)

    try {
		const response = await axios(options);
		const data = response.data;
        console.log(data)
        if(data) {
            return {success: "Success", data}
        }
        if(!data) {
            return {failed: "Failed", data}
        }
	} catch (error) {
		console.log("error", error);
	}

}

export default PostApi;