import axios from "./axios";

export const csrf = () => axios.get('/sanctum/csrf-cookie')
