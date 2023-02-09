import axios from "axios";

const client = axios.create({ baseURL:"https://movie-review-backend-qaalv.ondigitalocean.app/api" });

export default client;
 