import axios from "axios";
import toast from "react-hot-toast";
import { getToken, removeToken } from "../utils/auth";

// Use proxy in development, direct URL in production
const baseURL = import.meta.env.DEV
  ? "/api/v1" // Akan melalui Vite proxy
  : "https://nugrahanggarasiregar.my.id/api/v1"; // Direct URL untuk production
// Check if the environment variable is set correctly
// const BASE_URL =
//   import.meta.env.VITE_API_URL || "http://141.11.190.106:15000/api/v1";

// // Use the environment variable or fallback to hardcoded URL
// const baseURL = BASE_URL;

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

// Handle token expiration and errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful response in development mode
    if (import.meta.env.DEV) {
      console.log("API Response:", response.config.url, response.status);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Sesi telah berakhir, silakan login kembali");
      removeToken();
      window.location.href = "/auth";
    } else if (error.response?.status === 403) {
      toast.error("Anda tidak memiliki akses untuk melakukan tindakan ini");
    } else if (error.response?.status === 404) {
      toast.error("Data tidak ditemukan");
    } else if (error.response?.status >= 500) {
      toast.error("Terjadi kesalahan server. Coba lagi nanti.");
    } else if (error.code === "NETWORK_ERROR" || !error.response) {
      toast.error("Koneksi bermasalah. Periksa koneksi internet Anda.");
    } else {
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan. Coba lagi nanti."
      );
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
