import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_API_BACKEND_URL;

if (!baseUrl) {
  throw new Error("VITE_API_BACKEND_URL is not defined in .env");
}

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
