import React from "react";
import { useNavigate } from "react-router-dom";

const KategoriTrimester3: React.FC = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "Persiapan Persalinan",
      excerpt:
        "Checklist lengkap persiapan fisik dan mental menjelang persalinan",
      readTime: "8 menit",
      category: "Persiapan",
      image: "🏥",
      isPopular: true,
      content: "Persiapan persalinan dimulai dari trimester ketiga...",
    },
    {
      id: 2,
      title: "Tanda-tanda Persalinan",
      excerpt: "Mengenali tanda-tanda persalinan sudah dekat",
      readTime: "6 menit",
      category: "Persalinan",
      image: "⏰",
      isPopular: true,
      content: "Tanda-tanda persalinan meliputi kontraksi teratur...",
    },
    {
      id: 3,
      title: "Posisi Bayi dalam Kandungan",
      excerpt: "Memahami posisi bayi dan persiapan jika posisi sungsang",
      readTime: "7 menit",
      category: "Perkembangan",
      image: "👶",
      isPopular: true,
      content: "Posisi kepala di bawah adalah posisi ideal untuk persalinan...",
    },
    {
      id: 4,
      title: "Nutrisi Trimester Akhir",
      excerpt: "Kebutuhan nutrisi untuk persiapan menyusui dan persalinan",
      readTime: "6 menit",
      category: "Nutrisi",
      image: "🍎",
      isPopular: false,
      content: "Nutrisi di trimester ketiga fokus pada persiapan persalinan...",
    },
    {
      id: 5,
      title: "Tas Persalinan",
      excerpt:
        "Daftar lengkap barang yang harus disiapkan untuk ke rumah sakit",
      readTime: "5 menit",
      category: "Persiapan",
      image: "👜",
      isPopular: true,
      content: "Tas persalinan sebaiknya disiapkan sejak usia 32 minggu...",
    },
    {
      id: 6,
      title: "Pemeriksaan Rutin Trimester 3",
      excerpt: "Jadwal dan jenis pemeriksaan menjelang persalinan",
      readTime: "8 menit",
      category: "Pemeriksaan",
      image: "📋",
      isPopular: false,
      content: "Pemeriksaan lebih sering diperlukan di trimester ketiga...",
    },
    {
      id: 7,
      title: "Mengatasi Ketidaknyamanan",
      excerpt: "Tips mengatasi nyeri punggung, kaki bengkak, dan sesak napas",
      readTime: "7 menit",
      category: "Kesejahteraan",
      image: "💆‍♀️",
      isPopular: false,
      content: "Ketidaknyamanan di trimester ketiga adalah hal normal...",
    },
    {
      id: 8,
      title: "Persiapan Menyusui",
      excerpt: "Tips mempersiapkan payudara dan mental untuk menyusui",
      readTime: "6 menit",
      category: "Menyusui",
      image: "🤱",
      isPopular: true,
      content: "Persiapan menyusui dapat dimulai sejak trimester ketiga...",
    },
    {
      id: 9,
      title: "Baby Blues dan Depresi Pasca Melahirkan",
      excerpt: "Mengenali dan mengatasi perubahan emosi setelah melahirkan",
      readTime: "9 menit",
      category: "Psikologi",
      image: "💙",
      isPopular: false,
      content: "Baby blues adalah kondisi normal yang dialami banyak ibu...",
    },
    {
      id: 10,
      title: "Induksi Persalinan",
      excerpt: "Kapan dan mengapa induksi persalinan diperlukan",
      readTime: "7 menit",
      category: "Persalinan",
      image: "💊",
      isPopular: false,
      content: "Induksi persalinan dilakukan dalam kondisi medis tertentu...",
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

          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="flex items-center mb-4">
              <div className="text-6xl mr-6">🍼</div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Trimester 3</h1>
                <p className="text-purple-100 text-xl">
                  Minggu 28-40 Kehamilan
                </p>
                <p className="text-purple-100 mt-2">
                  Persiapan akhir menuju kelahiran sang buah hati
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">10</div>
                <div className="text-sm text-purple-100">Total Artikel</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-purple-100">Artikel Populer</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">~7 min</div>
                <div className="text-sm text-purple-100">Rata-rata Baca</div>
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
                  placeholder="Cari artikel tentang trimester 3..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

            {/* Emergency Info */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-red-800 mb-2 flex items-center">
                🚨 Info Darurat
              </h3>
              <p className="text-sm text-red-700 mb-3">
                Segera hubungi rumah sakit jika mengalami:
              </p>
              <ul className="text-xs text-red-600 space-y-1">
                <li>• Kontraksi teratur 5 menit sekali</li>
                <li>• Pecah ketuban</li>
                <li>• Perdarahan</li>
                <li>• Penurunan gerakan janin</li>
              </ul>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => navigate(`/edukasi/trimester-3/${article.id}`)}
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

                      <button className="text-purple-500 hover:text-purple-700 transition-colors">
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
              <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors">
                Muat Lebih Banyak Artikel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KategoriTrimester3;
