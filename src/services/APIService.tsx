interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  status: string;
  message: string;
  token?: string;
  data?: null;
}

const API_BASE_URL = "https://your-api-base-url.com";

export const AuthService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1.0/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};
