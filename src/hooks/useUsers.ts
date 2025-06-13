import { useQuery } from "@tanstack/react-query";
import InquiryService, { type User } from "../services/InquiryService";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await InquiryService.getAllUsers();
      return response.detail.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Helper function untuk menghitung usia kehamilan dari HPHT
export const calculatePregnancyAge = (hpht: string | null): string => {
  if (!hpht) return "Belum diisi";

  const hphtDate = new Date(hpht);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - hphtDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;

  if (weeks === 0) {
    return `${days} hari`;
  }

  return `${weeks} minggu ${days} hari`;
};

export type { User };
