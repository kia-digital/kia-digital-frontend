import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import InquiryService, {
  type UpdateANCRequest,
} from "../services/InquiryService";

interface UpdateANCParams {
  idAnc: string;
  ancData: UpdateANCRequest;
}

// Hook untuk update ANC
export const useUpdateANCExamination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ idAnc, ancData }: UpdateANCParams) =>
      InquiryService.updateANCExamination(idAnc, ancData),
    onSuccess: (data, variables) => {
      console.log("ANC examination updated successfully:", data);
      // Invalidate and refetch any related queries
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // Invalidate all user-anc-records queries
      queryClient.invalidateQueries({ queryKey: ["user-anc-records"] });
      queryClient.invalidateQueries({ queryKey: ["anc-records"] });
      queryClient.invalidateQueries({ queryKey: ["ancRecords"] });
      // Invalidate specific ANC record
      queryClient.invalidateQueries({
        queryKey: ["anc-record", variables.idAnc],
      });

      // Force refetch all user-anc-records
      queryClient.refetchQueries({ queryKey: ["user-anc-records"] });
    },
    onError: (error) => {
      console.error("Failed to update ANC examination:", error);
    },
  });
};

// Hook untuk get ANC
export const useGetANCExamination = (idAnc: string | null) => {
  return useQuery({
    queryKey: ["anc-record", idAnc],
    queryFn: async () => {
      if (!idAnc) throw new Error("ANC ID is required");

      console.log("Fetching ANC examination for ID:", idAnc);

      try {
        const result = await InquiryService.getANCExamination(idAnc);
        console.log("Get ANC raw response:", result);

        // Validate response structure
        if (!result || !result.detail) {
          throw new Error("Invalid response structure: missing detail");
        }

        if (result.detail.status !== "success") {
          throw new Error(
            `API Error: ${result.detail.message || "Unknown error"}`
          );
        }

        if (!result.detail.data) {
          throw new Error("No data in response");
        }

        console.log("Get ANC validated data:", result.detail.data);
        return result;
      } catch (error) {
        console.error("Failed to get ANC examination:", error);
        throw error;
      }
    },
    enabled: !!idAnc, // Hanya jalankan query jika idAnc tersedia
    staleTime: 5 * 60 * 1000, // 5 menit
    retry: (failureCount, error) => {
      console.log(`Get ANC retry attempt ${failureCount + 1}, error:`, error);
      // Don't retry on 404 errors
      if (error instanceof Error && error.message.includes("404")) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

export default { useUpdateANCExamination, useGetANCExamination };
