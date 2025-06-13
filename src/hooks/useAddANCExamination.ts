import { useMutation, useQueryClient } from "@tanstack/react-query";
import InquiryService, { type AddANCRequest } from "../services/InquiryService";

interface AddANCParams {
  id: string;
  ancData: AddANCRequest;
}

export const useAddANCExamination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ancData }: AddANCParams) =>
      InquiryService.addANCExamination(id, ancData),
    onSuccess: (data, variables) => {
      console.log("ANC examination added successfully:", data);
      // Invalidate and refetch any related queries
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // Invalidate all user-anc-records queries
      queryClient.invalidateQueries({ queryKey: ["user-anc-records"] });
      // Specifically invalidate the user's ANC records
      queryClient.invalidateQueries({
        queryKey: ["user-anc-records", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["anc-records"] });
      queryClient.invalidateQueries({ queryKey: ["ancRecords"] });

      // Force refetch the specific user's ANC records
      queryClient.refetchQueries({
        queryKey: ["user-anc-records", variables.id],
      });
    },
    onError: (error) => {
      console.error("Failed to add ANC examination:", error);
    },
  });
};

export default useAddANCExamination;
