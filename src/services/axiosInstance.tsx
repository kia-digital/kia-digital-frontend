import axios from "axios";
import toast from "react-hot-toast";
import { getToken, removeToken } from "../utils/auth";

// Use proxy in development, direct URL in production
const baseURL = import.meta.env.DEV
  ? "/api/v1" // Akan melalui Vite proxy
  : "http://141.11.190.106:15000/api/v1"; // Direct URL untuk production

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
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Sesi telah berakhir, silakan login kembali");
      removeToken();
      window.location.href = "/auth";
    } else if (error.response?.status === 403) {
      toast.error("Anda tidak memiliki akses untuk melakukan tindakan ini");
    } else if (error.response?.status >= 500) {
      toast.error("Terjadi kesalahan server. Coba lagi nanti.");
    } else if (error.code === "NETWORK_ERROR" || !error.response) {
      toast.error("Koneksi bermasalah. Periksa koneksi internet Anda.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
