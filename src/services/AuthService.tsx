import axiosInstance from "./axiosInstance";
import toast from "react-hot-toast";
import { setToken, removeToken } from "../utils/auth";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  detail: {
    status: string;
    message: string;
    token?: string;
  };
}

interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

interface RegisterResponse {
  status: string;
  message: string;
  errors: string[];
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      toast.loading("Logging in...", { id: "login" });
      const response = await axiosInstance.post("/auth/login", credentials);
      const data: LoginResponse = response.data;
      if (data.detail.status === "success" && data.detail.token) {
        setToken(data.detail.token);
        toast.success("Login berhasil!", { id: "login" });
      } else {
        toast.error(data.detail.message || "Login gagal", { id: "login" });
      }
      return data;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login gagal. Periksa kembali email dan password.", {
        id: "login",
      });
      throw error;
    }
  }
  async register(credentials: RegisterCredentials): Promise<RegisterResponse> {
    try {
      toast.loading("Mendaftarkan akun...", { id: "register" });
      const response = await axiosInstance.post("/auth/register", credentials);
      const data: RegisterResponse = response.data;

      if (data.status === "success") {
        toast.success("Registrasi berhasil! Silakan login.", {
          id: "register",
        });
      } else {
        const errorMessage =
          data.errors?.length > 0
            ? data.errors.join(", ")
            : data.message || "Registrasi gagal";
        toast.error(errorMessage, { id: "register" });
      }

      return data;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registrasi gagal. Coba lagi.", { id: "register" });
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      // Try to logout from server if endpoint exists
      // This is optional and won't fail if the endpoint doesn't exist
      try {
        await axiosInstance.post("/auth/logout");
      } catch (error) {
        // Ignore server logout errors - continue with local logout
        console.log(
          "Server logout not available or failed, continuing with local logout"
        );
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clean up local storage regardless of server response
      removeToken();
      // Clear any other user-related data
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userInformation");

      // Redirect to auth page
      window.location.href = "/auth";
    }
  }
}

export default new AuthService();
