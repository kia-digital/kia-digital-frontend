import { useQuery } from "@tanstack/react-query";
import ArticleService from "../services/ArticleService";
import { useUserInformation } from "./useUserInformation";

/**
 * Hook to get article recommendations based on current user's trimester
 */
export const useArticleRecommendations = () => {
  // Get user information to determine trimester
  const { data: userInformation, isLoading: isLoadingUser } =
    useUserInformation();

  // Calculate current trimester
  const currentTrimester = userInformation
    ? ArticleService.getCurrentTrimester(userInformation)
    : null;

  // Fetch recommendations based on trimester
  const {
    data: recommendations,
    isLoading: isLoadingRecommendations,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["articleRecommendations", currentTrimester],
    queryFn: async () => {
      if (!currentTrimester) {
        throw new Error("Trimester tidak dapat ditentukan dari data HPHT");
      }

      const response = await ArticleService.getArticleRecommendations(
        currentTrimester
      );
      if (response.detail.status === "success") {
        return response.detail.data;
      }
      throw new Error(
        response.detail.message || "Failed to fetch recommendations"
      );
    },
    enabled: !!currentTrimester && !isLoadingUser, // Only run when we have trimester data
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
  });

  return {
    recommendations: recommendations || [],
    currentTrimester,
    isLoading: isLoadingUser || isLoadingRecommendations,
    error,
    isError,
    refetch,
    hasHPHTData: !!userInformation?.personal_info?.hpht,
  };
};

/**
 * Hook to get article recommendations for a specific trimester
 */
export const useArticleRecommendationsByTrimester = (trimester: number) => {
  return useQuery({
    queryKey: ["articleRecommendations", trimester],
    queryFn: async () => {
      const response = await ArticleService.getArticleRecommendations(
        trimester
      );
      if (response.detail.status === "success") {
        return response.detail.data;
      }
      throw new Error(
        response.detail.message || "Failed to fetch recommendations"
      );
    },
    enabled: !!trimester && trimester >= 1 && trimester <= 3,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
  });
};
