import axios from "axios";
const apiUrl = "http://localhost:3000/spot/";

export function login() {
    return axios.get(`${apiUrl}/login`);
}