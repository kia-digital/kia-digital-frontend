import React from "react";
import { useNavigate } from "react-router-dom";

const KategoriTrimester1: React.FC = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "Perubahan Tubuh di Trimester Pertama",
      excerpt:
        "Memahami perubahan fisik dan hormonal yang terjadi pada 12 minggu pertama kehamilan",
      readTime: "5 menit",
      category: "Perkembangan",
      image: "🤱",
      isPopular: true,
      content:
        "Trimester pertama adalah periode krusial dalam kehamilan dimana terjadi banyak perubahan...",
    },
    {
      id: 2,
      title: "Mengatasi Morning Sickness",
      excerpt:
        "Tips praktis untuk mengurangi mual dan muntah di awal kehamilan",
      readTime: "4 menit",
      category: "Tips Kesehatan",
      image: "🤢",
      isPopular: true,
      content:
        "Morning sickness adalah kondisi normal yang dialami banyak ibu hamil...",
    },
    {
      id: 3,
      title: "Nutrisi Penting Trimester 1",
      excerpt:
        "Asam folat, vitamin, dan mineral yang dibutuhkan untuk perkembangan janin",
      readTime: "6 menit",
      category: "Nutrisi",
      image: "🥗",
      isPopular: false,
      content:
        "Nutrisi yang tepat sangat penting untuk perkembangan organ janin...",
    },
    {
      id: 4,
      title: "Tanda Bahaya Trimester 1",
      excerpt:
        "Kapan harus segera mencari bantuan medis selama trimester pertama",
      readTime: "7 menit",
      category: "Keamanan",
      image: "⚠️",
      isPopular: false,
      content: "Beberapa gejala memerlukan perhatian medis segera...",
    },
    {
      id: 5,
      title: "Perkembangan Janin Minggu 1-12",
      excerpt:
        "Tahapan perkembangan janin dari konsepsi hingga akhir trimester pertama",
      readTime: "8 menit",
      category: "Perkembangan",
      image: "👶",
      isPopular: true,
      content: "Perkembangan janin di trimester pertama sangat pesat...",
    },
    {
      id: 6,
      title: "Olahraga Aman untuk Ibu Hamil Muda",
      excerpt:
        "Jenis aktivitas fisik yang aman dan bermanfaat di trimester pertama",
      readTime: "5 menit",
      category: "Olahraga",
      image: "🏃‍♀️",
      isPopular: false,
      content:
        "Olahraga ringan dapat membantu menjaga kesehatan selama kehamilan...",
    },
    {
      id: 7,
      title: "Pemeriksaan Rutin Trimester 1",
      excerpt: "Jadwal dan jenis pemeriksaan yang diperlukan di awal kehamilan",
      readTime: "6 menit",
      category: "Pemeriksaan",
      image: "🩺",
      isPopular: false,
      content: "Pemeriksaan rutin membantu memantau kesehatan ibu dan janin...",
    },
    {
      id: 8,
      title: "Mengelola Emosi di Awal Kehamilan",
      excerpt:
        "Cara mengatasi perubahan mood dan kecemasan di trimester pertama",
      readTime: "5 menit",
      category: "Psikologi",
      image: "😊",
      isPopular: false,
      content: "Perubahan hormonal dapat mempengaruhi suasana hati...",
    },
    {
      id: 9,
      title: "Pantangan Makanan Trimester 1",
      excerpt:
        "Daftar makanan dan minuman yang harus dihindari selama kehamilan muda",
      readTime: "4 menit",
      category: "Nutrisi",
      image: "🚫",
      isPopular: true,
      content: "Beberapa makanan dapat berbahaya untuk perkembangan janin...",
    },
    {
      id: 10,
      title: "Tidur yang Berkualitas untuk Ibu Hamil",
      excerpt:
        "Tips mendapatkan istirahat yang cukup meski sering merasa lelah",
      readTime: "4 menit",
      category: "Kesejahteraan",
      image: "😴",
      isPopular: false,
      content: "Kualitas tidur sangat penting untuk kesehatan ibu dan janin...",
    },
    {
      id: 11,
      title: "Suplemen yang Dibutuhkan",
      excerpt: "Vitamin prenatal dan suplemen penting di trimester pertama",
      readTime: "5 menit",
      category: "Nutrisi",
      image: "💊",
      isPopular: false,
      content: "Suplemen dapat membantu memenuhi kebutuhan nutrisi tambahan...",
    },
    {
      id: 12,
      title: "Persiapan Mental Menjadi Ibu",
      excerpt: "Mempersiapkan diri secara psikologis untuk peran sebagai ibu",
      readTime: "7 menit",
      category: "Psikologi",
      image: "💭",
      isPopular: false,
      content: "Persiapan mental sama pentingnya dengan persiapan fisik...",
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

          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex items-center mb-4">
              <div className="text-6xl mr-6">🤱</div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Trimester 1</h1>
                <p className="text-pink-100 text-xl">Minggu 1-12 Kehamilan</p>
                <p className="text-pink-100 mt-2">
                  Informasi lengkap untuk mendampingi perjalanan trimester
                  pertama Anda
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-pink-100">Total Artikel</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-pink-100">Artikel Populer</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">~6 min</div>
                <div className="text-sm text-pink-100">Rata-rata Baca</div>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-1">
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari artikel tentang trimester 1..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => navigate(`/edukasi/trimester-1/${article.id}`)}
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

                      <button className="text-pink-500 hover:text-pink-700 transition-colors">
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
              <button className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors">
                Muat Lebih Banyak Artikel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KategoriTrimester1;
