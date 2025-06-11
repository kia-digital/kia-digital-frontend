import React from "react";
import { useNavigate } from "react-router-dom";

const KategoriAsupanGizi: React.FC = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "Kebutuhan Kalori Ibu Hamil",
      excerpt:
        "Panduan lengkap kebutuhan kalori harian untuk setiap trimester kehamilan",
      readTime: "7 menit",
      category: "Kalori",
      image: "🔥",
      isPopular: true,
      content: "Kebutuhan kalori meningkat seiring perkembangan kehamilan...",
    },
    {
      id: 2,
      title: "Asam Folat: Nutrisi Vital",
      excerpt:
        "Manfaat asam folat untuk mencegah cacat tabung saraf pada janin",
      readTime: "6 menit",
      category: "Vitamin",
      image: "🥬",
      isPopular: true,
      content: "Asam folat sangat penting terutama di trimester pertama...",
    },
    {
      id: 3,
      title: "Zat Besi untuk Mencegah Anemia",
      excerpt: "Pentingnya zat besi dan cara meningkatkan penyerapannya",
      readTime: "8 menit",
      category: "Mineral",
      image: "🥩",
      isPopular: true,
      content: "Anemia defisiensi besi adalah masalah umum pada kehamilan...",
    },
    {
      id: 4,
      title: "Kalsium untuk Tulang Kuat",
      excerpt: "Kebutuhan kalsium untuk perkembangan tulang dan gigi janin",
      readTime: "6 menit",
      category: "Mineral",
      image: "🥛",
      isPopular: true,
      content: "Kalsium diperlukan untuk pembentukan tulang janin...",
    },
    {
      id: 5,
      title: "Protein Berkualitas Tinggi",
      excerpt:
        "Sumber protein terbaik untuk pertumbuhan dan perkembangan janin",
      readTime: "7 menit",
      category: "Protein",
      image: "🍳",
      isPopular: true,
      content: "Protein adalah building block untuk pertumbuhan janin...",
    },
    {
      id: 6,
      title: "Makanan yang Harus Dihindari",
      excerpt: "Daftar lengkap makanan yang berbahaya selama kehamilan",
      readTime: "9 menit",
      category: "Pantangan",
      image: "🚫",
      isPopular: true,
      content: "Beberapa makanan dapat membahayakan ibu dan janin...",
    },
    {
      id: 7,
      title: "Omega-3 untuk Otak Janin",
      excerpt:
        "Manfaat asam lemak omega-3 untuk perkembangan otak dan mata janin",
      readTime: "6 menit",
      category: "Lemak Sehat",
      image: "🐟",
      isPopular: false,
      content: "Omega-3 DHA sangat penting untuk perkembangan neurologis...",
    },
    {
      id: 8,
      title: "Mengatasi Mual dengan Makanan",
      excerpt:
        "Tips memilih makanan yang tepat untuk mengurangi morning sickness",
      readTime: "5 menit",
      category: "Tips",
      image: "🍋",
      isPopular: false,
      content: "Beberapa makanan dapat membantu mengurangi mual...",
    },
    {
      id: 9,
      title: "Hidrasi yang Optimal",
      excerpt: "Pentingnya menjaga kecukupan cairan selama kehamilan",
      readTime: "5 menit",
      category: "Hidrasi",
      image: "💧",
      isPopular: false,
      content: "Kebutuhan cairan meningkat selama kehamilan...",
    },
    {
      id: 10,
      title: "Suplemen Prenatal",
      excerpt: "Panduan memilih dan mengonsumsi vitamin prenatal yang tepat",
      readTime: "8 menit",
      category: "Suplemen",
      image: "💊",
      isPopular: false,
      content: "Suplemen prenatal membantu memenuhi kebutuhan gizi...",
    },
    {
      id: 11,
      title: "Menu Seimbang Harian",
      excerpt: "Contoh menu harian yang seimbang untuk ibu hamil",
      readTime: "10 menit",
      category: "Menu",
      image: "🍽️",
      isPopular: false,
      content: "Menu seimbang mencakup semua kelompok makanan...",
    },
    {
      id: 12,
      title: "Camilan Sehat untuk Ibu Hamil",
      excerpt:
        "Ide camilan bergizi untuk mengatasi rasa lapar di antara makanan utama",
      readTime: "6 menit",
      category: "Camilan",
      image: "🥜",
      isPopular: false,
      content: "Camilan sehat membantu menjaga energi sepanjang hari...",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Kembali ke Dashboard
          </button>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
            <div className="flex items-center mb-4">
              <div className="text-6xl mr-6">🥗</div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Asupan Gizi</h1>
                <p className="text-green-100 text-xl">
                  Nutrisi Optimal untuk Ibu dan Bayi
                </p>
                <p className="text-green-100 mt-2">
                  Panduan lengkap nutrisi seimbang untuk mendukung kehamilan
                  yang sehat
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-green-100">Total Artikel</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm text-green-100">Nutrisi Penting</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">~7 min</div>
                <div className="text-sm text-green-100">Rata-rata Baca</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-1">
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari artikel tentang asupan gizi..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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

            {/* Nutrition Tip */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                🌱 Tips Nutrisi
              </h3>
              <p className="text-sm text-green-700">
                Konsumsi makanan beragam dari berbagai kelompok untuk memastikan
                kebutuhan gizi terpenuhi. Jangan lupa minum air putih minimal
                8-10 gelas per hari.
              </p>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => navigate(`/edukasi/asupan-gizi/${article.id}`)}
                  className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{article.image}</div>
                    </div>

                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{article.readTime}</span>
                        <span>•</span>
                        <span>{article.category}</span>
                      </div>

                      <button className="text-green-500 hover:text-green-700 transition-colors">
                        <svg
                          className="w-5 h-5"
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
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-8">
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
                Muat Lebih Banyak Artikel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KategoriAsupanGizi;
