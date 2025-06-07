// Helper function to decode JWT token (basic implementation)
const decodeJWT = (token: string) => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    return null;
  }
};

// Helper function to check if token is expired
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) {
      return true; // Consider expired if can't decode or no expiry
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // Consider expired if any error occurs
  }
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    // Check if token is not empty
    if (token.trim().length === 0) {
      removeToken();
      return false;
    }

    // If token looks like a JWT, check if it's expired
    if (token.includes(".")) {
      if (isTokenExpired(token)) {
        removeToken();
        return false;
      }
    }

    return true;
  } catch (error) {
    // If there's any error with token validation, consider user as not authenticated
    console.error("Token validation error:", error);
    removeToken();
    return false;
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
  // Dispatch custom event to notify components of auth state change
  window.dispatchEvent(new CustomEvent("authStateChanged"));
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
  // Dispatch custom event to notify components of auth state change
  window.dispatchEvent(new CustomEvent("authStateChanged"));
};

export const logout = (): void => {
  removeToken();
  // Clear any other user-related data from localStorage if needed
  // localStorage.removeItem("user");
  // localStorage.removeItem("userRole");
};

export const getCurrentUser = () => {
  const token = getToken();
  if (!token) return null;

  try {
    if (token.includes(".")) {
      const decoded = decodeJWT(token);
      return decoded;
    }
    return null;
  } catch (error) {
    console.error("Error decoding user token:", error);
    return null;
  }
};
