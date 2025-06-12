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
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="mb-3">
          <span className="text-pink-400 text-sm font-medium">{category}</span>
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
      category: "Trimester Pertama",
      title: "Perubahan Tubuh di Trimester Pertama",
      description:
        "Memahami perubahan fisik dan hormonal yang terjadi pada 12 minggu pertama kehamilan",
      preview:
        "Trimester pertama adalah periode krusial dalam kehamilan dimana terjadi banyak perubahan...",
      categoryRoute: "trimester-1",
    },
    {
      id: 11,
      category: "Trimester Kedua",
      title: "Perkembangan Janin Trimester 2",
      description: "Milestone penting perkembangan bayi di usia 13-27 minggu",
      preview:
        "Trimester kedua adalah periode emas kehamilan dimana banyak organ berkembang...",
      categoryRoute: "trimester-2",
    },
    {
      id: 21,
      category: "Trimester Ketiga",
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
        <div className="p-6">
          {/* Banner Section */}
          <div className="relative bg-gradient-to-r from-pink-100 to-pink-400 rounded-2xl overflow-hidden mb-8 h-64">
            <div className="absolute inset-0 flex items-center">
              <div className="w-1/2 p-8">
                {/* <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-4xl">📚</span>
                </div> */}
                <img src="" alt="" />
              </div>
              <div className="w-1/2 p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Edukasi Kesehatan Ibu
                </h3>
                <p className="text-pink-100 leading-relaxed">
                  Jangan biarkan mitos seputar kehamilan membuatmu bingung.
                  Temukan informasi terpercaya dan rekomendasi artikel edukatif
                  sesuai dengan kondisi kesehatanmu
                </p>
              </div>
            </div>{" "}
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
