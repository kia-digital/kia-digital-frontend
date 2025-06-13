import { useQuery } from "@tanstack/react-query";
import InquiryService, { type Relationship } from "../services/InquiryService";

export const useRelationships = () => {
  return useQuery({
    queryKey: ["relationships"],
    queryFn: async () => {
      try {
        const response = await InquiryService.getRelationships();
        if (response.detail.status === "success") {
          return response.detail.data;
        }
        throw new Error(
          response.detail.message || "Failed to fetch relationships"
        );
      } catch (error) {
        console.error("Relationships fetch error:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - relationships data doesn't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors (auth issues)
      if (error instanceof Error && error.message.includes("401")) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

export type { Relationship };
