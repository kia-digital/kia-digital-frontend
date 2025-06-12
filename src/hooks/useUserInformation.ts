import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import InquiryService, {
  type UserInformation,
  type UpdateUserRequest,
} from "../services/InquiryService";

export const useUserInformation = () => {
  return useQuery({
    queryKey: ["userInformation"],
    queryFn: async () => {
      const response = await InquiryService.getUserInformation();
      if (response.detail.status === "success") {
        return response.detail.data;
      }
      throw new Error(
        response.detail.message || "Failed to fetch user information"
      );
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
  });
};

// Hook for just the personal info
export const usePersonalInfo = () => {
  const { data, isLoading, error, isError } = useUserInformation();

  return {
    personalInfo: data?.personal_info || null,
    isLoading,
    error,
    isError,
  };
};

// Hook for just the medical record
export const useMedicalRecord = () => {
  const { data, isLoading, error, isError } = useUserInformation();

  return {
    medicalRecord: data?.medical_record || null,
    isLoading,
    error,
    isError,
  };
};

export const useUpdateUserInformation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: UpdateUserRequest) => {
      toast.loading("Menyimpan data...", { id: "update-user" });
      const response = await InquiryService.updateUserInformation(userData);
      if (response.detail.status === "success") {
        return response;
      }
      throw new Error(
        response.detail.message || "Failed to update user information"
      );
    },
    onSuccess: () => {
      // Invalidate and refetch user information
      queryClient.invalidateQueries({ queryKey: ["userInformation"] });
      toast.success("Data berhasil disimpan!", { id: "update-user" });
    },
    onError: (error) => {
      console.error("Update user information error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Gagal menyimpan data";
      toast.error(errorMessage, { id: "update-user" });
    },
  });
};

// Helper function to map marital status string to ID
export const mapMaritalStatusToId = (status: string): number => {
  const statusMap: Record<string, number> = {
    Menikah: 1,
    "Belum Menikah": 2,
    Cerai: 3,
    Janda: 4,
    Duda: 5,
  };
  return statusMap[status] || 2; // Default to "Belum Menikah"
};

// Helper function to map marital status ID to string
export const mapMaritalStatusToString = (id: number): string => {
  const statusMap: Record<number, string> = {
    1: "Menikah",
    2: "Belum Menikah",
    3: "Cerai",
    4: "Janda",
    5: "Duda",
  };
  return statusMap[id] || "Belum Menikah";
};

export type { UserInformation };
