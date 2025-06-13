import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faClock } from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../../components/PageHeader";
import axiosInstance from "../../services/axiosInstance";
import { normalizeArticle, parseTags } from "../../utils/articleHelpers";
import type { Article } from "../../utils/articleHelpers";

// Using the Article interface from articleHelpers.ts

const ArtikelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchArticleDetail = async () => {
      if (!id) {
        setError("ID artikel tidak valid");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log(`Fetching article detail for ID: ${id}`);

        // First, try to get article from localStorage
        const storedArticles = localStorage.getItem("edukasiArticles");
        if (storedArticles) {
          const articles: Article[] = JSON.parse(storedArticles);
          const foundArticle = articles.find(
            (article) => article.id.toString() === id
          );

          if (foundArticle) {
            console.log("Article found in localStorage:", foundArticle);
            setArticle(foundArticle);
            setLoading(false);
            return;
          }
        }

        // If not found in localStorage, try API (though it doesn't exist)
        console.log("Article not found in localStorage, trying API...");
        const response = await axiosInstance.get(`/article/${id}`);

        console.log("API Response received:", response.data);

        // Use the helper function to normalize article data from any response format
        const normalizedArticle = normalizeArticle(response.data);

        if (!normalizedArticle) {
          throw new Error("Data artikel tidak ditemukan atau tidak valid");
        }

        console.log("Normalized article:", normalizedArticle);
        setArticle(normalizedArticle);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching article details:", err);

        // Check if it's a network error or server error
        if (err.response?.status === 404) {
          setError("Artikel tidak ditemukan");
        } else if (err.response?.status >= 500) {
          setError("Server sedang bermasalah. Silakan coba lagi nanti.");
        } else if (err.code === "NETWORK_ERROR" || !err.response) {
          setError("Koneksi bermasalah. Periksa koneksi internet Anda.");
        } else {
          setError("Gagal memuat artikel. Menggunakan data contoh.");
        }

        // Use mock data as fallback
        const fallbackArticle = normalizeArticle(null);
        setArticle(fallbackArticle);
        setLoading(false);
      }
    };

    fetchArticleDetail();
  }, [id]);

  // Show loading state
  if (loading) {
    return (
      <>
        <PageHeader
          title="Loading Article..."
          subtitle="Please wait"
          showLembarPemantauan={false}
          showUserAvatar={true}
        />
        <div className="bg-gray-100 min-h-screen p-6 flex items-center justify-center">
          <div className="spinner-border h-12 w-12 border-4 border-t-primary-500 border-primary-200 rounded-full animate-spin"></div>
        </div>
      </>
    );
  } // Show error state only if there's a real error and no article data
  if (error && !article) {
    return (
      <>
        <PageHeader
          title="Artikel Tidak Ditemukan"
          subtitle="Artikel yang Anda cari tidak tersedia"
          showLembarPemantauan={false}
          showUserAvatar={true}
        />
        <div className="bg-gray-100 min-h-screen p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">😞</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{error}</h2>
              <p className="text-gray-600 mb-6">
                Artikel yang Anda cari mungkin telah dihapus atau tidak
                tersedia.
              </p>
              <button
                onClick={() => navigate("/edukasi")}
                className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Kembali ke Halaman Edukasi
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // If no article data but no specific error (shouldn't happen with our fallback logic)
  if (!article) {
    return (
      <>
        <PageHeader
          title="Artikel Tidak Ditemukan"
          subtitle="Artikel yang Anda cari tidak tersedia"
          showLembarPemantauan={false}
          showUserAvatar={true}
        />
        <div className="bg-gray-100 min-h-screen p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">😞</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Artikel Tidak Ditemukan
              </h2>
              <p className="text-gray-600 mb-6">
                Artikel yang Anda cari tidak tersedia.
              </p>
              <button
                onClick={() => navigate("/edukasi")}
                className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Kembali ke Halaman Edukasi
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  // Default placeholder values if not provided by API
  const imageEmoji = article.image || "📝";
  const readTime = article.readTime || "5 menit membaca";

  // Function to handle category button click
  const handleCategoryClick = (kategori: string) => {
    // Convert category to URL-friendly format
    const categorySlug = kategori.toLowerCase().replace(/\s+/g, "-");
    navigate(`/edukasi?kategori=${categorySlug}`);
  };

  return (
    <>
      <PageHeader
        title={article.judul}
        subtitle={`${article.kategori} • ${readTime} • ${
          article.publishDate || "Artikel Edukasi"
        }`}
        showLembarPemantauan={false}
        showUserAvatar={true}
      />

      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          {/* Back Button */}
          <button
            onClick={() => navigate("/edukasi")}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 mb-6 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Kembali ke Edukasi</span>
          </button>

          {/* Article Header */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl">{imageEmoji}</span>{" "}
                <div>
                  <button
                    onClick={() => handleCategoryClick(article.kategori)}
                    className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-2 hover:bg-blue-200 transition-colors"
                  >
                    {article.kategori}
                  </button>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {article.judul}
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {article.deskripsi}
              </p>

              {/* Article Meta */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 pb-6">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faClock} />
                  <span>{readTime}</span>
                </div>
                {article.author && <div>Oleh: {article.author}</div>}
                {article.publishDate && <div>{article.publishDate}</div>}
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-8">
              {article.fullContent || article.content ? (
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: article.fullContent || article.content || "",
                  }}
                />
              ) : (
                <div className="prose prose-lg max-w-none">
                  <p>{article.deskripsi}</p>
                  <p className="text-gray-500 italic mt-4">
                    Konten lengkap artikel ini sedang dalam proses penulisan.
                  </p>
                </div>
              )}{" "}
              {/* Tags (if available) */}{" "}
              {article.tag && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {parseTags(article.tag).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtikelDetail;
