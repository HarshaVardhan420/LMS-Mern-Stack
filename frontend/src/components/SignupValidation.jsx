import * as Yup from "yup";

export const signupValidation = Yup.object({
    studentid: Yup.string().min(4).required("Please enter Student ID").matches(/^[a-zA-Z 0-9@]+$/, "This field is character only or Number"),
    name: Yup.string().min(3).required("Please enter Name").matches(/^[a-zA-Z @]+$/, "This field is character only or with spaces"),
    course: Yup.string().min(3).required("Please enter Course").matches(/^[a-zA-Z @]+$/, "This field is character only or with spaces"),
    yearandsection: Yup.string().min(3).required("Please enter Year and Section").matches(/^[a-zA-Z 0-9@]+$/, "This field is character only or Number"),
    email: Yup.string().email("Please enter Valid Email").required("Please enter Email"),
    password: Yup.string().min(6).required("Please enter Password"),
    confirmpassword: Yup.string().oneOf([Yup.ref("password")], "Password not matched"),
})