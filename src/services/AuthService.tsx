import axiosInstance from "./axiosInstance";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  status: string;
  message: string;
  token?: string;
  data?: null;
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
      if (data.status === "success") {
        localStorage.setItem("authToken", data.token || "");
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
}

export default new AuthService();
