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
      <div className="p-6">
        <div className="mb-3">
          <span className="text-primary-500 text-sm font-medium">
            {category}
          </span>
        </div>
        <h3 className="text-gray-900 font-semibold text-lg mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {description}
        </p>
        <p className="text-gray-500 text-sm leading-relaxed">{preview}</p>
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
        {" "}
        <div className="p-6">
          {/* Banner Section */}
          <div className="relative bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 rounded-3xl overflow-hidden mb-8 shadow-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
              <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-white rounded-full"></div>
            </div>

            <div className="relative flex items-center min-h-[280px]">
              {/* Left Side - Icon/Visual */}
              <div className="w-1/2 p-8 flex justify-center">
                <div className="relative">
                  {/* Main Circle Background */}
                  <div className="w-40 h-40 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30">
                    <div className="w-32 h-32 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                      <span className="text-6xl">📚</span>
                    </div>
                  </div>

                  {/* Floating Icons */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-white bg-opacity-25 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xl">💡</span>
                  </div>
                  <div className="absolute -bottom-2 -left-6 w-10 h-10 bg-white bg-opacity-25 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-lg">🤱</span>
                  </div>
                  <div className="absolute top-1/2 -right-8 w-8 h-8 bg-white bg-opacity-25 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-sm">❤️</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="w-1/2 p-8 text-white">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-4xl font-bold mb-2 leading-tight">
                      Edukasi Kesehatan
                    </h2>
                    <h3 className="text-2xl font-semibold text-primary-100">
                      untuk Ibu & Anak
                    </h3>
                  </div>
                  <p className="text-primary-50 leading-relaxed text-lg">
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
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Rekomendasi untuk Anda!
            </h3>{" "}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
