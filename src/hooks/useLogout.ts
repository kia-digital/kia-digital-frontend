import { useState } from "react";
import toast from "react-hot-toast";
import AuthService from "../services/AuthService";

interface UseLogoutReturn {
  logout: () => Promise<void>;
  isLoggingOut: boolean;
  logoutError: string | null;
}

export const useLogout = (): UseLogoutReturn => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const logout = async (): Promise<void> => {
    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      toast.loading("Logging out...", { id: "logout" });
      await AuthService.logout();
      toast.success("Logout berhasil!", { id: "logout" });
      // AuthService.logout() already handles redirection
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutError("Gagal logout. Coba lagi.");
      toast.error("Gagal logout. Coba lagi.", { id: "logout" });

      // Fallback: redirect to auth even if logout fails
      setTimeout(() => {
        window.location.href = "/auth";
      }, 1000);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    logout,
    isLoggingOut,
    logoutError,
  };
};
