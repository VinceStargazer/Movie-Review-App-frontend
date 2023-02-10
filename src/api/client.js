import axios from "axios";

// https://movie-review-backend-qaalv.ondigitalocean.app/api
const client = axios.create({ baseURL:"http://localhost:8000/api" });

export default client;
 