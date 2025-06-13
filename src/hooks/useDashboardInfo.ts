import { useState, useEffect } from "react";
import UserInformationService from "../services/UserInformationService";
import type { UserInformationData } from "../services/UserInformationService";

interface UseDashboardInfoReturn {
  userInfo: UserInformationData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  totalDays: number;
  conditionDisplay: {
    text: string;
    bgColor: string;
    textColor: string;
    borderColor: string;
  };
}

export const useDashboardInfo = (): UseDashboardInfoReturn => {
  const [userInfo, setUserInfo] = useState<UserInformationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInformation = async () => {
    try {
      setLoading(true);
      setError(null);

      const userId = UserInformationService.getCurrentUserId();
      if (!userId) {
        throw new Error("User ID not found. Please login again.");
      }

      const data = await UserInformationService.getUserInformation(userId);
      setUserInfo(data);
    } catch (err: any) {
      console.error("Error fetching user information:", err);
      setError(err.message || "Failed to fetch user information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInformation();
  }, []);

  // Calculate total days of pregnancy
  const totalDays = userInfo?.hpht
    ? UserInformationService.calculateTotalDays(userInfo.hpht)
    : 0;

  // Get condition display information
  const conditionDisplay = UserInformationService.getConditionDisplay(
    userInfo?.kondisi || null
  );

  return {
    userInfo,
    loading,
    error,
    refetch: fetchUserInformation,
    totalDays,
    conditionDisplay,
  };
};
