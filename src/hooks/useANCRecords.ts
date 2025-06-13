import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ANCService, { type ANCCheckupData } from "../services/ANCService";
import axiosInstance from "../services/axiosInstance";

interface ANCRecord {
  id: string;
  scheduled: string;
  location: string;
  medical_officer?: string; // Optional karena mungkin tidak ada di response
  checkup_result: {
    body_weight: number;
    heart_rate: number;
    blood_pressure: string;
    status: string;
    uterine_fundus_height: number;
    blood_sugar: number;
    body_temperature: number;
  };
  note?: string; // Optional karena mungkin tidak ada di response
}

interface ANCRecordsResponse {
  detail: {
    status: string;
    message: string;
    data: ANCRecord[];
  };
}

export const useANCRecords = () => {
  return useQuery({
    queryKey: ["ancRecords"],
    queryFn: async () => {
      try {
        const response = await ANCService.getANCRecords();
        if (response.detail.status === "success") {
          return ANCService.transformANCData(response.detail.data);
        }
        throw new Error(
          response.detail.message || "Failed to fetch ANC records"
        );
      } catch (error) {
        console.error("ANC records fetch error:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors (auth issues)
      if (error instanceof Error && error.message.includes("401")) {
        return false;
      }
      return failureCount < 2;
    },
    meta: {
      onError: (error: Error) => {
        toast.error(`Gagal memuat data ANC: ${error.message}`);
      },
    },
  });
};

// Hook for getting ANC records by user ID (for petugas dashboard)
export const useUserANCRecords = (userId: string | null) => {
  return useQuery({
    queryKey: ["user-anc-records", userId],
    queryFn: async (): Promise<ANCRecord[]> => {
      if (!userId) return [];

      try {
        // Get ANC records for specific user
        const response = await axiosInstance.get<ANCRecordsResponse>(
          `/inquiry/anc/?id=${userId}`
        );

        if (response.data.detail.status === "success") {
          return response.data.detail.data || [];
        }

        throw new Error(
          response.data.detail.message || "Failed to fetch user ANC records"
        );
      } catch (error) {
        console.error("User ANC records fetch error:", error);
        // Return empty array if no records found or any error occurs
        // This is expected for users without ANC records
        return [];
      }
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry to avoid unnecessary API calls
  });
};

export type { ANCCheckupData, ANCRecord };
