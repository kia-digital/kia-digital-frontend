import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import InquiryService, {
  type UpdateHPHTRequest,
} from "../services/InquiryService";

export const useUpdateHPHT = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (hphtData: UpdateHPHTRequest) => {
      toast.loading("Menyimpan data HPHT...", { id: "update-hpht" });
      const response = await InquiryService.updateHPHT(hphtData);
      if (response.detail.status === "success") {
        return response;
      }
      throw new Error(
        response.detail.message || "Failed to update HPHT information"
      );
    },
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["userInformation"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Data HPHT berhasil disimpan!", { id: "update-hpht" });
    },
    onError: (error) => {
      console.error("Update HPHT error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Gagal menyimpan data HPHT";
      toast.error(errorMessage, { id: "update-hpht" });
    },
  });
};
