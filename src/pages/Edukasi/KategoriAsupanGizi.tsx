import React from "react";
import { useNavigate } from "react-router-dom";

const KategoriAsupanGizi: React.FC = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "Panduan Gizi Lengkap Ibu Hamil",
      excerpt:
        "Kebutuhan nutrisi dari trimester 1 hingga 3 untuk mendukung perkembangan janin",
      readTime: "10 menit",
      category: "Panduan Lengkap",
      image: "🥗",
      isPopular: true,
      content: "Nutrisi seimbang adalah kunci kehamilan yang sehat...",
    },
    {
      id: 2,
      title: "Asam Folat: Vitamin Super untuk Janin",
      excerpt:
        "Manfaat asam folat dan sumber makanan terbaik untuk mencegah cacat tabung saraf",
      readTime: "6 menit",
      category: "Vitamin",
      image: "🥬",
      isPopular: true,
      content:
        "Asam folat sangat penting untuk perkembangan sistem saraf janin...",
    },
    {
      id: 3,
      title: "Protein untuk Pertumbuhan Janin",
      excerpt:
        "Kebutuhan protein harian dan sumber protein berkualitas untuk ibu hamil",
      readTime: "7 menit",
      category: "Makronutrien",
      image: "🥩",
      isPopular: true,
      content: "Protein adalah building block untuk pertumbuhan janin...",
    },
    {
      id: 4,
      title: "Zat Besi: Mencegah Anemia Kehamilan",
      excerpt: "Pentingnya zat besi dan cara meningkatkan penyerapannya",
      readTime: "6 menit",
      category: "Mineral",
      image: "🥩",
      isPopular: true,
      content: "Anemia defisiensi besi umum terjadi pada ibu hamil...",
    },
    {
      id: 5,
      title: "Kalsium untuk Tulang Kuat",
      excerpt: "Kebutuhan kalsium dan dampaknya pada kesehatan ibu dan janin",
      readTime: "5 menit",
      category: "Mineral",
      image: "🥛",
      isPopular: false,
      content: "Kalsium penting untuk pembentukan tulang dan gigi janin...",
    },
    {
      id: 6,
      title: "Omega-3 untuk Perkembangan Otak",
      excerpt:
        "DHA dan EPA dari ikan untuk mendukung perkembangan neurologis janin",
      readTime: "6 menit",
      category: "Lemak Sehat",
      image: "🐟",
      isPopular: true,
      content: "Asam lemak omega-3 penting untuk perkembangan otak janin...",
    },
    {
      id: 7,
      title: "Hidrasi yang Tepat saat Hamil",
      excerpt: "Kebutuhan cairan dan tips menjaga hidrasi selama kehamilan",
      readTime: "4 menit",
      category: "Cairan",
      image: "💧",
      isPopular: false,
      content: "Hidrasi yang baik membantu transportasi nutrisi ke janin...",
    },
    {
      id: 8,
      title: "Mengatasi Mual dengan Makanan",
      excerpt:
        "Strategi diet untuk mengurangi morning sickness di trimester pertama",
      readTime: "5 menit",
      category: "Tips Praktis",
      image: "🤢",
      isPopular: false,
      content: "Makanan tertentu dapat membantu mengurangi rasa mual...",
    },
    {
      id: 9,
      title: "Snack Sehat untuk Ibu Hamil",
      excerpt: "Ideas camilan bergizi yang mudah dibuat dan dikonsumsi",
      readTime: "5 menit",
      category: "Resep",
      image: "🍎",
      isPopular: false,
      content: "Snack sehat membantu menjaga energi sepanjang hari...",
    },
    {
      id: 10,
      title: "Diet Vegetarian saat Hamil",
      excerpt: "Panduan memenuhi kebutuhan nutrisi dengan diet nabati",
      readTime: "8 menit",
      category: "Diet Khusus",
      image: "🥕",
      isPopular: false,
      content:
        "Diet vegetarian yang terencana dapat memenuhi kebutuhan kehamilan...",
    },
    {
      id: 11,
      title: "Makanan yang Harus Dihindari",
      excerpt: "Daftar makanan berbahaya dan pantangan selama kehamilan",
      readTime: "6 menit",
      category: "Pantangan",
      image: "🚫",
      isPopular: true,
      content: "Beberapa makanan dapat membahayakan perkembangan janin...",
    },
    {
      id: 12,
      title: "Suplemen vs Makanan Natural",
      excerpt: "Kapan membutuhkan suplemen dan nutrisi dari sumber alami",
      readTime: "7 menit",
      category: "Suplemen",
      image: "💊",
      isPopular: false,
      content: "Makanan alami umumnya lebih baik dari suplemen...",
    },
    // ... tambah artikel lainnya hingga 20
  ];

  const nutritionFacts = [
    {
      nutrient: "Kalori",
      trimester1: "+0 kal",
      trimester2: "+340 kal",
      trimester3: "+450 kal",
      sources: "Karbohidrat kompleks, protein",
    },
    {
      nutrient: "Protein",
      trimester1: "71g",
      trimester2: "71g",
      trimester3: "71g",
      sources: "Daging, ikan, telur, kacang",
    },
    {
      nutrient: "Asam Folat",
      trimester1: "600μg",
      trimester2: "600μg",
      trimester3: "600μg",
      sources: "Sayuran hijau, jeruk",
    },
    {
      nutrient: "Zat Besi",
      trimester1: "27mg",
      trimester2: "27mg",
      trimester3: "27mg",
      sources: "Daging merah, bayam",
    },
    {
      nutrient: "Kalsium",
      trimester1: "1000mg",
      trimester2: "1000mg",
      trimester3: "1000mg",
      sources: "Susu, keju, sayuran hijau",
    },
  ];

  const categories = [
    { name: "Semua", count: 12, active: true },
    { name: "Panduan Lengkap", count: 1, active: false },
    { name: "Vitamin", count: 1, active: false },
    { name: "Makronutrien", count: 1, active: false },
    { name: "Mineral", count: 2, active: false },
    { name: "Lemak Sehat", count: 1, active: false },
    { name: "Cairan", count: 1, active: false },
    { name: "Tips Praktis", count: 1, active: false },
    { name: "Resep", count: 1, active: false },
    { name: "Diet Khusus", count: 1, active: false },
    { name: "Pantangan", count: 1, active: false },
    { name: "Suplemen", count: 1, active: false },
  ];

  const popularArticles = articles.filter((article) => article.isPopular);

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
                <div className="text-2xl font-bold">20</div>
                <div className="text-sm text-green-100">Total Artikel</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm text-green-100">Artikel Populer</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">~6 min</div>
                <div className="text-sm text-green-100">Rata-rata Baca</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories Filter */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Kategori</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      category.active
                        ? "bg-green-100 text-green-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Nutrition Guide */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                📊 Kebutuhan Harian
              </h3>
              <div className="space-y-3">
                {nutritionFacts.slice(0, 3).map((fact, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <h4 className="font-medium text-sm text-gray-800 mb-2">
                      {fact.nutrient}
                    </h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>T1:</span>
                        <span className="font-medium">{fact.trimester1}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>T2:</span>
                        <span className="font-medium">{fact.trimester2}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>T3:</span>
                        <span className="font-medium">{fact.trimester3}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{fact.sources}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                🔥 Artikel Populer
              </h3>
              <div className="space-y-4">
                {popularArticles.slice(0, 3).map((article) => (
                  <div
                    key={article.id}
                    className="border-b border-gray-100 pb-4 last:border-b-0"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{article.image}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-800 mb-1 line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {article.readTime} • {article.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari artikel tentang gizi dan nutrisi..."
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

            {/* Quick Tips */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                💡 Tips Nutrisi Cepat
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
                <div className="flex items-start space-x-2">
                  <span className="text-green-600">✓</span>
                  <p>Makan porsi kecil tapi sering (5-6x sehari)</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600">✓</span>
                  <p>Kombinasikan zat besi dengan vitamin C</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600">✓</span>
                  <p>Minum air putih minimal 8 gelas sehari</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600">✓</span>
                  <p>Konsumsi ikan 2-3x seminggu untuk omega-3</p>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{article.image}</div>
                      {article.isPopular && (
                        <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                          Populer
                        </span>
                      )}
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
