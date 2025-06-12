import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ANCService, { type ANCCheckupData } from "../services/ANCService";

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

export type { ANCCheckupData };
