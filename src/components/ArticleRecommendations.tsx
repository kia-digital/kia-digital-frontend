import React from "react";
import { useNavigate } from "react-router-dom";
import { useArticleRecommendations } from "../hooks/useArticleRecommendations";

interface ArticleRecommendationsProps {
  className?: string;
}

const ArticleRecommendations: React.FC<ArticleRecommendationsProps> = ({
  className = "",
}) => {
  const navigate = useNavigate();
  const { recommendations, currentTrimester, isLoading, error, hasHPHTData } =
    useArticleRecommendations();

  // Don't show recommendations if user doesn't have HPHT data
  if (!hasHPHTData) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border p-6 ${className}`}>
        <div className="text-center">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Rekomendasi Artikel Khusus Anda
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Untuk mendapatkan rekomendasi artikel yang sesuai dengan usia
            kehamilan Anda, silakan lengkapi data HPHT di halaman Informasi Ibu.
          </p>
          <button
            onClick={() => navigate("/pemeriksaan")}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors text-sm"
          >
            Lengkapi Data HPHT
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Rekomendasi Artikel untuk Anda
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-16 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border p-6 ${className}`}>
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Tidak Dapat Memuat Rekomendasi
          </h3>
          <p className="text-gray-600 text-sm">
            Maaf, terjadi kesalahan saat memuat rekomendasi artikel.
          </p>
        </div>
      </div>
    );
  }

  // Show recommendations
  return (
    <div className={`bg-white rounded-xl shadow-sm border ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Rekomendasi untuk Anda
          </h3>
          {currentTrimester && (
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
              Trimester {currentTrimester}
            </span>
          )}
        </div>

        {recommendations.length > 0 ? (
          <div className="space-y-3">
            {recommendations.map((article) => (
              <div
                key={article.id}
                onClick={() => navigate(`/edukasi/${article.id}`)}
                className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">📄</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-primary-600 font-medium">
                        {article.category}
                      </span>
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex items-center space-x-1">
                          {article.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {tag.replace(/_/g, " ")}
                            </span>
                          ))}
                          {article.tags.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{article.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📚</div>
            <p className="text-gray-600 text-sm">
              Belum ada rekomendasi artikel untuk trimester ini.
            </p>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Rekomendasi berdasarkan kondisi kesehatan dan usia kehamilan Anda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleRecommendations;
