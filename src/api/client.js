import axios from "axios";

// "https://movie-review-backend-qaalv.ondigitalocean.app/api"
// "http://localhost:8000/api"
const client = axios.create({ baseURL: "https://movie-review-app-backend-7yu4.onrender.com/api"});

export default client;
 