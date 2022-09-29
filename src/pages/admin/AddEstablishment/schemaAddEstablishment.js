import * as yup from "yup";

const schemaAddEstablishment = yup.object().shape({
    title: yup
      .string()
      .required("Please enter a title")
      .min(4, "Minimum 4 Characters"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Please enter a price")
      .min(100, "Minimum 100 NOK"),
    about: yup
      .string()
      .required("Please write an about text")
      .min(10, "Minimum 10 Characters"),
    address: yup.string().required("Please enter an address"),
    breakfast: yup.boolean().required("Please select yes or no"),
    starsRating: yup.number("Please select how many stars"),
    tripadvisorlink: yup.string(),
    rating: yup.number("Please select a rating").required().typeError("Rating must be a number").min(1, "minmum 1.0").max(5, "Maximum 5.0"),
    facilities: yup.array().nullable(),
    images: yup
      .mixed()
      .test("Required", "Please select at least one image", (value) => {
        return value && value.length;
      }),
  });

  export default schemaAddEstablishment;
  