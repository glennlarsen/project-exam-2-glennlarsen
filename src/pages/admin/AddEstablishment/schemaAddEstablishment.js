import * as yup from "yup";
import { MIN_TITLE_CHARACTERS, MIN_PRICE, MIN_ABOUT_CHARACTERS } from "constants/validationRules";

const schemaAddEstablishment = yup.object().shape({
  title: yup
    .string()
    .required("Please enter a title")
    .min(MIN_TITLE_CHARACTERS, `Minimum ${MIN_TITLE_CHARACTERS} Characters`),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Please enter a price")
    .min(MIN_PRICE, `Minimum ${MIN_PRICE} NOK`),
  about: yup
    .string()
    .required("Please write an about text")
    .min(MIN_ABOUT_CHARACTERS, `Minimum ${MIN_ABOUT_CHARACTERS} Characters`),
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
