import axiosInstance from "./axiosInstance";
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
      const response = await axiosInstance.post("/auth/login", credentials);
      const data: LoginResponse = response.data;
      if (data.detail.status === "success" && data.detail.token) {
        setToken(data.detail.token);
      }
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
  async register(credentials: RegisterCredentials): Promise<RegisterResponse> {
    try {
      const response = await axiosInstance.post("/auth/register", credentials);
      const data: RegisterResponse = response.data;
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  logout(): void {
    removeToken();
  }
}

export default new AuthService();
