import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import InquiryService, {
  type UpdateEmergencyContactRequest,
} from "../services/InquiryService";

export const useUpdateEmergencyContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contactData: UpdateEmergencyContactRequest) => {
      const response = await InquiryService.updateEmergencyContact(contactData);
      return response;
    },
    onSuccess: () => {
      toast.success("Kontak darurat berhasil diperbarui!");
      // Invalidate and refetch user information to get updated data
      queryClient.invalidateQueries({ queryKey: ["userInformation"] });
    },
    onError: (error: Error) => {
      console.error("Emergency contact update error:", error);
      toast.error(`Gagal memperbarui kontak darurat: ${error.message}`);
    },
  });
};

export type { UpdateEmergencyContactRequest };
