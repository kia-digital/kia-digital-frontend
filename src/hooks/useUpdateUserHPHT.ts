import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import InquiryService, {
  type UpdateUserRequest,
} from "../services/InquiryService";
import { useUserInformation } from "./useUserInformation";

interface UpdateHPHTParams {
  hpht: string;
}

export const useUpdateUserHPHT = () => {
  const queryClient = useQueryClient();
  const { data: userInformation } = useUserInformation();

  return useMutation({
    mutationFn: async ({ hpht }: UpdateHPHTParams) => {
      toast.loading("Menyimpan data HPHT...", { id: "update-user-hpht" });

      // Ensure we have user information
      if (!userInformation) {
        throw new Error("User information is not available");
      }

      // Prepare the update request based on existing user data and new HPHT
      const { personal_info } = userInformation;

      // Log the original data for debugging
      console.log("Original personal_info from API:", personal_info);
      console.log("Updating HPHT from:", personal_info.hpht, "to:", hpht);

      const updateData: UpdateUserRequest = {
        name: personal_info.name || "",
        phone_number: personal_info.telp || "",
        birth_place: personal_info.birth_place || "",
        date_of_birth: personal_info.date_of_birth,
        address: personal_info.address || "",
        marital_status_id: mapMaritalStatusToId(
          personal_info.marital_status || ""
        ),
        age: personal_info.age || 0,
        blood_group: personal_info.blood_group || "",
        hpht: hpht, // Add the new HPHT value
      };

      console.log("Sending update request with HPHT data:", updateData);
      const response = await InquiryService.updateUserInformation(updateData);
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
      toast.success("Data HPHT berhasil disimpan!", { id: "update-user-hpht" });
    },
    onError: (error) => {
      console.error("Update user HPHT error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Gagal menyimpan data HPHT";
      toast.error(errorMessage, { id: "update-user-hpht" });
    },
  });
};

// Helper function to map marital status string to ID
const mapMaritalStatusToId = (status: string): number => {
  const statusMap: Record<string, number> = {
    Menikah: 1,
    "Belum Menikah": 2,
    Cerai: 3,
    Janda: 4,
    Duda: 5,
  };
  return statusMap[status] || 2; // Default to "Belum Menikah"
};
