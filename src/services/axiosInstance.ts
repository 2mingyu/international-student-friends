import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "", // TODO
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer token`, // TODO
  },
});

export default axiosInstance;
