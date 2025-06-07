import axios from "axios";
import { getToken, removeToken } from "../utils/auth";

// Use proxy path for development, full URL for production
const baseURL = import.meta.env.DEV
  ? "/api/v1" // This will be proxied to the actual API in development
  : "https://api.nugrahanggarasiregar.my.id/api/v1";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request details in development
    if (import.meta.env.DEV) {
      console.log(
        "Making request to:",
        (config.baseURL || "") + (config.url || "")
      );
      console.log("Request method:", config.method);
      console.log("Request headers:", config.headers);
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
