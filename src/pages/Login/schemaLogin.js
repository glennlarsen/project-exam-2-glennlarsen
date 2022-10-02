import * as yup from "yup";

const schemaLogin = yup.object().shape({
    identifier: yup.string().required("Please enter your username"),
    password: yup.string().required("Please enter your password"),
});

export default schemaLogin;