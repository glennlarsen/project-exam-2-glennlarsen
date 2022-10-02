import * as yup from "yup";
import { MIN_NAME_CHARACTERS, EMAIL_REGEX } from "constants/validationRules";

const schemaEnquiry = yup.object().shape({
    name: yup
        .string()
        .required("Please enter your name")
        .min(MIN_NAME_CHARACTERS, `First Name must be at least ${MIN_NAME_CHARACTERS} characters`),
    email: yup
        .string()
        .required("Please enter your email")
        .matches(EMAIL_REGEX, "Enter a valid email"),
    comment: yup.string().notRequired(),
    checkin: yup.date('Start Date is Required')
        .typeError("Start date is required"),
    checkout: yup.date('End Date is Required')
        .typeError("End date is required"),
    guests: yup
        .number(),
});

export default schemaEnquiry;