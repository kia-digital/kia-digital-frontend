import React from "react";
import { useNavigate } from "react-router-dom";

const KategoriImunisasi: React.FC = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "Vaksin yang Aman untuk Ibu Hamil",
      excerpt:
        "Daftar imunisasi yang direkomendasikan dan aman selama kehamilan",
      readTime: "8 menit",
      category: "Panduan",
      image: "💉",
      isPopular: true,
      content: "Beberapa vaksin penting dan aman untuk ibu hamil...",
    },
    {
      id: 2,
      title: "Vaksin Tetanus Toksoid (TT)",
      excerpt:
        "Pentingnya imunisasi TT untuk mencegah tetanus pada bayi baru lahir",
      readTime: "6 menit",
      category: "Wajib",
      image: "🛡️",
      isPopular: true,
      content: "Vaksin TT melindungi ibu dan bayi dari tetanus neonatorum...",
    },
    {
      id: 3,
      title: "Vaksin Influenza saat Hamil",
      excerpt: "Manfaat dan keamanan vaksin flu untuk ibu hamil dan janin",
      readTime: "5 menit",
      category: "Musiman",
      image: "🤧",
      isPopular: true,
      content: "Vaksin influenza sangat direkomendasikan selama kehamilan...",
    },
    {
      id: 4,
      title: "Vaksin COVID-19 untuk Ibu Hamil",
      excerpt: "Panduan terbaru imunisasi COVID-19 selama masa kehamilan",
      readTime: "7 menit",
      category: "Pandemi",
      image: "😷",
      isPopular: true,
      content: "Vaksin COVID-19 terbukti aman dan efektif untuk ibu hamil...",
    },
    {
      id: 5,
      title: "Jadwal Imunisasi Kehamilan",
      excerpt: "Timeline lengkap kapan setiap vaksin sebaiknya diberikan",
      readTime: "6 menit",
      category: "Jadwal",
      image: "📅",
      isPopular: false,
      content: "Setiap vaksin memiliki timing optimal selama kehamilan...",
    },
    {
      id: 6,
      title: "Vaksin yang Dilarang saat Hamil",
      excerpt: "Jenis imunisasi yang harus dihindari selama masa kehamilan",
      readTime: "5 menit",
      category: "Larangan",
      image: "🚫",
      isPopular: false,
      content: "Vaksin hidup umumnya tidak diberikan pada ibu hamil...",
    },
    {
      id: 7,
      title: "Efek Samping Vaksin pada Kehamilan",
      excerpt: "Reaksi normal dan kapan harus waspada setelah imunisasi",
      readTime: "5 menit",
      category: "Keamanan",
      image: "⚠️",
      isPopular: false,
      content: "Efek samping ringan adalah respons normal sistem imun...",
    },
    {
      id: 8,
      title: "Imunisasi untuk Keluarga",
      excerpt: "Pentingnya vaksinasi anggota keluarga untuk melindungi bayi",
      readTime: "6 menit",
      category: "Keluarga",
      image: "👨‍👩‍👧‍👦",
      isPopular: false,
      content: "Konsep herd immunity dimulai dari lingkaran terdekat...",
    },
  ];

  const vaccineSchedule = [
    {
      trimester: "Trimester 1",
      vaccines: ["Tetanus Toksoid (TT1)", "Influenza"],
      timing: "Minggu 4-12",
      color: "bg-pink-100 text-pink-800",
    },
    {
      trimester: "Trimester 2",
      vaccines: ["Tetanus Toksoid (TT2)", "COVID-19"],
      timing: "Minggu 13-27",
      color: "bg-green-100 text-green-800",
    },
    {
      trimester: "Trimester 3",
      vaccines: ["Tetanus Toksoid (TT3)", "Pertussis (Tdap)"],
      timing: "Minggu 28-40",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  const categories = [
    { name: "Semua", count: 8, active: true },
    { name: "Panduan", count: 1, active: false },
    { name: "Wajib", count: 1, active: false },
    { name: "Musiman", count: 1, active: false },
    { name: "Pandemi", count: 1, active: false },
    { name: "Jadwal", count: 1, active: false },
    { name: "Larangan", count: 1, active: false },
    { name: "Keamanan", count: 1, active: false },
    { name: "Keluarga", count: 1, active: false },
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

          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-8 text-white">
            <div className="flex items-center mb-4">
              <div className="text-6xl mr-6">💉</div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Imunisasi</h1>
                <p className="text-blue-100 text-xl">
                  Perlindungan untuk Ibu dan Bayi
                </p>
                <p className="text-blue-100 mt-2">
                  Panduan lengkap imunisasi yang aman dan direkomendasikan
                  selama kehamilan
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-blue-100">Total Artikel</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm text-blue-100">Vaksin Wajib</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">~6 min</div>
                <div className="text-sm text-blue-100">Rata-rata Baca</div>
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
                        ? "bg-blue-100 text-blue-700 font-medium"
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

            {/* Vaccine Schedule */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                📅 Jadwal Imunisasi
              </h3>
              <div className="space-y-4">
                {vaccineSchedule.map((schedule, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <div
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${schedule.color}`}
                    >
                      {schedule.trimester}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      {schedule.timing}
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {schedule.vaccines.map((vaccine, vIndex) => (
                        <li key={vIndex} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          {vaccine}
                        </li>
                      ))}
                    </ul>
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
                  placeholder="Cari artikel tentang imunisasi..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

            {/* Important Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <div className="flex items-start space-x-3">
                <div className="text-yellow-600 text-xl">⚠️</div>
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">
                    Penting untuk Diketahui
                  </h3>
                  <p className="text-sm text-yellow-700">
                    Selalu konsultasikan dengan dokter atau bidan sebelum
                    melakukan imunisasi. Setiap kondisi kehamilan berbeda dan
                    memerlukan pendekatan yang tepat.
                  </p>
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

                      <button className="text-blue-500 hover:text-blue-700 transition-colors">
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
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                Muat Lebih Banyak Artikel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KategoriImunisasi;
