import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

interface ArticleCardProps {
  id: number;
  category: string;
  title: string;
  description: string;
  preview: string;
  categoryRoute: string;
  onClick: () => void;
}

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
  const articles = [
    {
      id: 1,
      category: "Trimester I",
      title: "Perubahan Tubuh di Trimester Pertama",
      description:
        "Memahami perubahan fisik dan hormonal yang terjadi pada 12 minggu pertama kehamilan",
      preview:
        "Trimester pertama adalah periode krusial dalam kehamilan dimana terjadi banyak perubahan...",
      categoryRoute: "trimester-1",
    },
    {
      id: 11,
      category: "Trimester II",
      title: "Perkembangan Janin Trimester 2",
      description: "Milestone penting perkembangan bayi di usia 13-27 minggu",
      preview:
        "Trimester kedua adalah periode emas kehamilan dimana banyak organ berkembang...",
      categoryRoute: "trimester-2",
    },
    {
      id: 21,
      category: "Trimester III",
      title: "Persiapan Persalinan",
      description: "Panduan lengkap mempersiapkan diri menjelang persalinan",
      preview:
        "Trimester ketiga adalah waktu untuk mempersiapkan persalinan...",
      categoryRoute: "trimester-3",
    },
    {
      id: 31,
      category: "Imunisasi",
      title: "Jadwal Imunisasi Ibu Hamil",
      description: "Vaksin yang aman dan diperlukan selama kehamilan",
      preview:
        "Imunisasi selama kehamilan penting untuk melindungi ibu dan bayi...",
      categoryRoute: "imunisasi",
    },
  ];

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
          </div>

          {/* Recommendations Section */}
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
              Rekomendasi untuk Anda!
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
              {articles.map((article, index) => (
                <ArticleCard
                  key={index}
                  id={article.id}
                  category={article.category}
                  title={article.title}
                  description={article.description}
                  preview={article.preview}
                  categoryRoute={article.categoryRoute}
                  onClick={() =>
                    navigate(`/edukasi/${article.categoryRoute}/${article.id}`)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EdukasiPage;
