import React from "react";
import { useNavigate } from "react-router-dom";

const KategoriTrimester2: React.FC = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "Perubahan Tubuh di Trimester Kedua",
      excerpt:
        "Masa 'honeymoon' kehamilan: perubahan positif dan yang perlu diperhatikan",
      readTime: "6 menit",
      category: "Perkembangan",
      image: "👶",
      isPopular: true,
      content: "Trimester kedua sering disebut masa terbaik kehamilan...",
    },
    {
      id: 2,
      title: "Perkembangan Janin Minggu 13-27",
      excerpt: "Tahapan penting perkembangan organ dan sistem tubuh janin",
      readTime: "8 menit",
      category: "Perkembangan",
      image: "🍼",
      isPopular: true,
      content: "Di trimester kedua, organ janin mulai berfungsi dengan baik...",
    },
    {
      id: 3,
      title: "Gerakan Janin Pertama",
      excerpt:
        "Kapan dan bagaimana merasakan gerakan janin untuk pertama kalinya",
      readTime: "5 menit",
      category: "Pengalaman",
      image: "🤗",
      isPopular: true,
      content: "Gerakan janin pertama adalah momen yang sangat dinantikan...",
    },
    {
      id: 4,
      title: "USG Anatomical Scan",
      excerpt:
        "Pemeriksaan USG detail untuk mendeteksi kelainan struktur janin",
      readTime: "7 menit",
      category: "Pemeriksaan",
      image: "🩻",
      isPopular: false,
      content:
        "USG anatomical scan biasanya dilakukan pada usia 18-22 minggu...",
    },
    {
      id: 5,
      title: "Olahraga untuk Trimester 2",
      excerpt:
        "Aktivitas fisik yang aman dan bermanfaat di masa kehamilan tengah",
      readTime: "6 menit",
      category: "Olahraga",
      image: "🏊‍♀️",
      isPopular: false,
      content:
        "Trimester kedua adalah waktu yang tepat untuk aktif berolahraga...",
    },
    {
      id: 6,
      title: "Nutrisi untuk Pertumbuhan Janin",
      excerpt: "Kebutuhan kalori dan nutrisi yang meningkat di trimester kedua",
      readTime: "6 menit",
      category: "Nutrisi",
      image: "🥙",
      isPopular: true,
      content:
        "Kebutuhan nutrisi meningkat seiring pertumbuhan janin yang pesat...",
    },
    {
      id: 7,
      title: "Persiapan Kelahiran Prematur",
      excerpt: "Tanda-tanda dan pencegahan kelahiran prematur",
      readTime: "8 menit",
      category: "Keamanan",
      image: "⚡",
      isPopular: false,
      content: "Mengenali tanda-tanda kontraksi prematur sangat penting...",
    },
    {
      id: 8,
      title: "Tidur yang Nyaman",
      excerpt: "Posisi tidur yang aman dan tips mengatasi gangguan tidur",
      readTime: "5 menit",
      category: "Kesejahteraan",
      image: "🛏️",
      isPopular: false,
      content:
        "Posisi tidur miring ke kiri adalah yang paling direkomendasikan...",
    },
    {
      id: 9,
      title: "Bonding dengan Janin",
      excerpt:
        "Cara membangun ikatan emosional dengan bayi sejak dalam kandungan",
      readTime: "5 menit",
      category: "Psikologi",
      image: "💕",
      isPopular: true,
      content: "Bonding dapat dimulai sejak janin masih dalam kandungan...",
    },
    {
      id: 10,
      title: "Perubahan Kulit dan Rambut",
      excerpt:
        "Mengatasi stretch marks, linea nigra, dan perubahan kulit lainnya",
      readTime: "4 menit",
      category: "Perawatan",
      image: "✨",
      isPopular: false,
      content: "Perubahan hormonal mempengaruhi kondisi kulit dan rambut...",
    },
    {
      id: 11,
      title: "Persiapan Menyusui",
      excerpt: "Tips mempersiapkan payudara dan mental untuk menyusui",
      readTime: "7 menit",
      category: "Persiapan",
      image: "🤱",
      isPopular: false,
      content: "Persiapan menyusui sebaiknya dimulai dari trimester kedua...",
    },
    {
      id: 12,
      title: "Travel Safety untuk Ibu Hamil",
      excerpt: "Panduan aman bepergian selama trimester kedua kehamilan",
      readTime: "6 menit",
      category: "Keamanan",
      image: "✈️",
      isPopular: false,
      content: "Trimester kedua adalah waktu terbaik untuk traveling...",
    },
    {
      id: 13,
      title: "Kelas Senam Hamil",
      excerpt: "Manfaat dan jenis senam yang tepat untuk ibu hamil trimester 2",
      readTime: "5 menit",
      category: "Olahraga",
      image: "🧘‍♀️",
      isPopular: false,
      content: "Senam hamil membantu mempersiapkan tubuh untuk persalinan...",
    },
    {
      id: 14,
      title: "Dental Care saat Hamil",
      excerpt: "Perawatan gigi dan mulut yang aman selama kehamilan",
      readTime: "4 menit",
      category: "Kesehatan",
      image: "🦷",
      isPopular: false,
      content: "Kesehatan gigi dan mulut penting dijaga selama kehamilan...",
    },
    {
      id: 15,
      title: "Glucose Screening Test",
      excerpt: "Tes skrining diabetes gestasional di trimester kedua",
      readTime: "6 menit",
      category: "Pemeriksaan",
      image: "🩸",
      isPopular: false,
      content: "Tes glukosa dilakukan untuk mendeteksi diabetes gestasional...",
    },
  ];

  const categories = [
    { name: "Semua", count: 15, active: true },
    { name: "Perkembangan", count: 2, active: false },
    { name: "Pengalaman", count: 1, active: false },
    { name: "Pemeriksaan", count: 2, active: false },
    { name: "Olahraga", count: 2, active: false },
    { name: "Nutrisi", count: 1, active: false },
    { name: "Keamanan", count: 2, active: false },
    { name: "Kesejahteraan", count: 1, active: false },
    { name: "Psikologi", count: 1, active: false },
    { name: "Perawatan", count: 1, active: false },
    { name: "Persiapan", count: 1, active: false },
    { name: "Kesehatan", count: 1, active: false },
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

          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
            <div className="flex items-center mb-4">
              <div className="text-6xl mr-6">👶</div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Trimester 2</h1>
                <p className="text-green-100 text-xl">Minggu 13-27 Kehamilan</p>
                <p className="text-green-100 mt-2">
                  Masa 'honeymoon' kehamilan - periode paling nyaman dan energik
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-green-100">Total Artikel</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">5</div>
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
                  placeholder="Cari artikel tentang trimester 2..."
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

export default KategoriTrimester2;
