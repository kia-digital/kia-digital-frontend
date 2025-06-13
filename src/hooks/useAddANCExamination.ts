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
    onSuccess: (data) => {
      console.log("ANC examination added successfully:", data);
      // Invalidate and refetch any related queries
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-anc-records"] });
      queryClient.invalidateQueries({ queryKey: ["anc-records"] });
    },
    onError: (error) => {
      console.error("Failed to add ANC examination:", error);
    },
  });
};

export default useAddANCExamination;
