import axiosInstance from "./axiosInstance";

// Article recommendation response interface
interface ArticleRecommendation {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
}

interface ArticleRecommendationResponse {
  detail: {
    status: string;
    message: string;
    data: ArticleRecommendation[];
  };
}

class ArticleService {
  /**
   * Get article recommendations based on trimester
   * @param trimester - The trimester number (1, 2, or 3)
   * @returns Promise with article recommendations
   */
  async getArticleRecommendations(
    trimester: number
  ): Promise<ArticleRecommendationResponse> {
    try {
      const response = await axiosInstance.get(
        `/article/recom?trimester=${trimester}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching article recommendations:", error);
      throw error;
    }
  }

  /**
   * Calculate trimester from HPHT date
   * @param hpht - HPHT date string
   * @returns Trimester number (1, 2, 3) or null if invalid
   */
  calculateTrimesterFromHPHT(hpht: string | null): number | null {
    if (!hpht) return null;

    try {
      const hphtDate = new Date(hpht);
      const today = new Date();
      const diffTime = today.getTime() - hphtDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(diffDays / 7);

      // Determine trimester based on weeks
      if (weeks <= 12) return 1;
      else if (weeks <= 28) return 2;
      else if (weeks <= 40) return 3;
      else return null; // Beyond normal pregnancy term
    } catch (error) {
      console.error("Error calculating trimester from HPHT:", error);
      return null;
    }
  }

  /**
   * Get current user's trimester from their HPHT
   * @param userInformation - User information data containing HPHT
   * @returns Current trimester number or null
   */
  getCurrentTrimester(userInformation: any): number | null {
    const hpht = userInformation?.personal_info?.hpht;
    return this.calculateTrimesterFromHPHT(hpht);
  }
}

export default new ArticleService();
export type { ArticleRecommendation, ArticleRecommendationResponse };
