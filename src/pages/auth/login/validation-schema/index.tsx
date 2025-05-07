import * as yup from 'yup';

export const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+{}\[\]:;'",.<>?`~/|\-]{8,}$/

export const LoginSchema = yup.object({
    email:yup.string().required("Email/Username is required"),
    password:yup.string().required("Password is required").matches(patternPassword,"Password must contain 8 characters, one uppercase, one lowercase, one number and one special case character.")
}).required()