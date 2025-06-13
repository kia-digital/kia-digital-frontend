import axiosInstance from "./axiosInstance";

export interface UserInformationData {
  name: string;
  hpl: string | null;
  hpht: string;
  usia_kehamilan: string;
  kondisi?: "low risk" | "mid risk" | "high risk" | null;
}

export interface UserInformationResponse {
  detail: {
    status: string;
    message: string;
    data: UserInformationData;
  };
}

class UserInformationService {
  /**
   * Get user information including pregnancy status and health condition
   */
  async getUserInformation(userId: string): Promise<UserInformationData> {
    try {
      console.log(`Fetching user information for ID: ${userId}`);

      const response = await axiosInstance.get(`/inquiry/information/hpht`, {
        params: { id: userId },
      });

      const data: UserInformationResponse = response.data;

      if (data.detail.status === "success") {
        console.log("User information fetched successfully:", data.detail.data);
        return data.detail.data;
      } else {
        throw new Error(
          data.detail.message || "Failed to fetch user information"
        );
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      throw error;
    }
  }

  /**
   * Calculate total days of pregnancy from HPHT
   */
  calculateTotalDays(hpht: string): number {
    const hphtDate = new Date(hpht);
    const today = new Date();
    const diffTime = today.getTime() - hphtDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  /**
   * Get condition status display text and styling
   */
  getConditionDisplay(kondisi: string | null): {
    text: string;
    bgColor: string;
    textColor: string;
    borderColor: string;
  } {
    switch (kondisi) {
      case "low risk":
        return {
          text: "Kondisi Ibu Sehat",
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          borderColor: "border-green-400",
        };
      case "mid risk":
        return {
          text: "Kondisi Ibu Perlu Perhatian",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-400",
        };
      case "high risk":
        return {
          text: "Kondisi Ibu Kritis",
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          borderColor: "border-red-400",
        };
      default:
        return {
          text: "Informasi Belum Tersedia",
          bgColor: "bg-gray-100",
          textColor: "text-gray-600",
          borderColor: "border-gray-400",
        };
    }
  }

  /**
   * Get current user ID from localStorage
   */
  getCurrentUserId(): string | null {
    return localStorage.getItem("userId");
  }
}

export default new UserInformationService();
