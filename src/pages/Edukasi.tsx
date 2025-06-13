import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import axiosInstance from "../services/axiosInstance";
import { normalizeArticleList } from "../utils/articleHelpers";
import type { Article as ArticleType } from "../utils/articleHelpers";

interface ArticleCardProps {
  id: number;
  category: string;
  title: string;
  description: string;
  preview?: string;
  categoryRoute?: string;
  tag?: string;
  onClick: () => void;
}

// Using the imported ArticleType instead of redefining it
type Article = ArticleType;

// ArticleCard component remains the same
const ArticleCard: React.FC<ArticleCardProps> = ({
  category,
  title,
  description,
  preview,
  onClick,
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4 sm:p-6">
        <div className="mb-3">
          <span className="text-primary-500 text-xs sm:text-sm font-medium">
            {category}
          </span>
        </div>
        <h3 className="text-gray-900 font-semibold text-base sm:text-lg mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
          {description}
        </p>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
          {preview}
        </p>
      </div>
    </div>
  );
};

const EdukasiPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for category filter from URL parameters
  useEffect(() => {
    const categoryFromUrl = searchParams.get("kategori");
    if (categoryFromUrl) {
      setActiveFilter(categoryFromUrl);
    }
  }, [searchParams]);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching articles from API...");
        const response = await axiosInstance.get(`/article/`);

        console.log("API Response received:", response.data);

        // Use the helper function to normalize article data
        const articleData = normalizeArticleList(response.data);
        console.log("Normalized articles:", articleData.length);

        // Save articles to localStorage for detail page access
        localStorage.setItem("edukasiArticles", JSON.stringify(articleData));

        setArticles(articleData);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching articles:", err);

        // Check if it's a network error or server error
        if (err.response?.status >= 500) {
          setError("Server sedang bermasalah. Silakan coba lagi nanti.");
        } else if (err.code === "NETWORK_ERROR" || !err.response) {
          setError("Koneksi bermasalah. Periksa koneksi internet Anda.");
        } else {
          setError("Gagal memuat artikel. Menggunakan data contoh.");
        } // Use mock data as fallback
        const fallbackData = normalizeArticleList(null);

        // Save fallback articles to localStorage for detail page access
        localStorage.setItem("edukasiArticles", JSON.stringify(fallbackData));

        setArticles(fallbackData);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);
  // Filter articles based on search query and category filter
  const filteredArticles = articles.filter((article) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      article.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tag.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by category
    const matchesCategory =
      activeFilter === "all" ||
      article.kategori.toLowerCase().replace(/\s+/g, "-") ===
        activeFilter.toLowerCase() ||
      article.kategori.toLowerCase() === activeFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Get unique categories from articles for filter buttons
  const categories = [...new Set(articles.map((article) => article.kategori))];

  return (
    <>
      <PageHeader
        title="Edukasi"
        subtitle="Temukan informasi terpercaya untuk kesehatan ibu dan anak"
        showLembarPemantauan={true}
        showUserAvatar={true}
      />

      <div className="bg-gray-100 min-h-screen">
        <div className="p-4 sm:p-6">
          {/* Banner Section */}
          <div className="relative bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 rounded-3xl overflow-hidden mb-6 sm:mb-8 shadow-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
              <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-white rounded-full"></div>
            </div>

            <div className="relative flex flex-col sm:flex-row items-center min-h-[200px] sm:min-h-[280px]">
              {/* Icon/Visual */}
              <div className="w-full sm:w-1/2 p-4 sm:p-8 flex justify-center order-2 sm:order-1">
                <div className="relative">
                  {/* Main Circle Background */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                      <span className="text-3xl sm:text-4xl lg:text-6xl">
                        📚
                      </span>
                    </div>
                  </div>

                  {/* Floating Icons */}
                  <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-12 sm:h-12 bg-white bg-opacity-25 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-sm sm:text-xl">💡</span>
                  </div>
                  <div className="absolute -bottom-1 -left-3 sm:-bottom-2 sm:-left-6 w-6 h-6 sm:w-10 sm:h-10 bg-white bg-opacity-25 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xs sm:text-lg">🤱</span>
                  </div>
                  <div className="absolute top-1/2 -right-4 sm:-right-8 w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-25 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xs sm:text-sm">❤️</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full sm:w-1/2 p-4 sm:p-8 text-white text-center sm:text-left order-1 sm:order-2">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 leading-tight">
                      Edukasi Kesehatan
                    </h2>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-100">
                      untuk Ibu & Anak
                    </h3>
                  </div>
                  <p className="text-primary-50 leading-relaxed text-sm sm:text-base lg:text-lg">
                    Jangan biarkan mitos seputar kehamilan membuatmu bingung.
                    Temukan informasi terpercaya dan rekomendasi artikel
                    edukatif sesuai dengan kondisi kesehatanmu.
                  </p>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* Search Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Artikel Edukasi
              </h2>
              <div className="w-full sm:w-64 relative">
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                className={`px-4 py-2 text-sm rounded-full ${
                  activeFilter === "all"
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors`}
                onClick={() => setActiveFilter("all")}
              >
                Semua
              </button>{" "}
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 text-sm rounded-full ${
                    activeFilter === category.toLowerCase().replace(/\s+/g, "-")
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transition-colors`}
                  onClick={() =>
                    setActiveFilter(category.toLowerCase().replace(/\s+/g, "-"))
                  }
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Loading state */}
            {loading && (
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="spinner-border h-8 w-8 mx-auto mb-4 border-2 border-t-primary-500 border-primary-200 rounded-full animate-spin"></div>
                <p className="text-gray-500">Memuat artikel...</p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="text-3xl mb-2">⚠️</div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  {error}
                </h3>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Coba lagi
                </button>
              </div>
            )}

            {/* Articles List */}
            {!loading && !error && (
              <>
                {filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredArticles.map((article, index) => (
                      <ArticleCard
                        key={index}
                        id={article.id}
                        category={article.kategori}
                        title={article.judul}
                        description={article.deskripsi}
                        preview=""
                        onClick={() => navigate(`/edukasi/${article.id}`)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <div className="text-3xl mb-2">🔍</div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      Tidak ada artikel yang ditemukan
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Coba dengan kata kunci lain atau filter yang berbeda
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EdukasiPage;
