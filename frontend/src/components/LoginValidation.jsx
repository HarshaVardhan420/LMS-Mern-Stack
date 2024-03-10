import * as Yup from "yup";

export const loginValidation = Yup.object({
    email: Yup.string().email("Please enter Valid Email").required("Please enter Email"),
    password: Yup.string().min(6).required("Please enter Password"),

})