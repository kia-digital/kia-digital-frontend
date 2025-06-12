import React from "react";
import { useNavigate } from "react-router-dom";

const KategoriImunisasi: React.FC = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "Vaksin Tetanus untuk Ibu Hamil",
      excerpt:
        "Pentingnya vaksin tetanus (TT) untuk melindungi ibu dan bayi dari tetanus neonatorum",
      readTime: "6 menit",
      category: "Vaksin Wajib",
      image: "💉",
      isPopular: true,
      content: "Vaksin tetanus sangat penting untuk ibu hamil...",
    },
    {
      id: 2,
      title: "Vaksin Influenza saat Hamil",
      excerpt: "Keamanan dan manfaat vaksin flu untuk ibu hamil dan janin",
      readTime: "5 menit",
      category: "Vaksin Musiman",
      image: "🤧",
      isPopular: true,
      content: "Vaksin influenza aman diberikan pada semua trimester...",
    },
    {
      id: 3,
      title: "Vaksin Hepatitis B",
      excerpt: "Pencegahan penularan hepatitis B dari ibu ke bayi",
      readTime: "7 menit",
      category: "Vaksin Wajib",
      image: "🏥",
      isPopular: true,
      content: "Vaksin hepatitis B dapat mencegah penularan ke bayi...",
    },
    {
      id: 4,
      title: "Jadwal Imunisasi Ibu Hamil",
      excerpt:
        "Timeline lengkap imunisasi yang harus diterima selama kehamilan",
      readTime: "8 menit",
      category: "Jadwal",
      image: "📅",
      isPopular: true,
      content: "Imunisasi ibu hamil mengikuti jadwal yang ketat...",
    },
    {
      id: 5,
      title: "Efek Samping Vaksin pada Kehamilan",
      excerpt:
        "Mengenali efek samping normal dan kapan harus menghubungi dokter",
      readTime: "6 menit",
      category: "Keamanan",
      image: "⚠️",
      isPopular: false,
      content: "Efek samping vaksin umumnya ringan dan sementara...",
    },
    {
      id: 6,
      title: "Vaksin COVID-19 untuk Ibu Hamil",
      excerpt:
        "Panduan terbaru vaksinasi COVID-19 selama kehamilan dan menyusui",
      readTime: "9 menit",
      category: "COVID-19",
      image: "🦠",
      isPopular: true,
      content: "Vaksin COVID-19 direkomendasikan untuk ibu hamil...",
    },
    {
      id: 7,
      title: "Imunisasi Pasif vs Aktif",
      excerpt:
        "Perbedaan dan manfaat imunisasi aktif dan pasif untuk ibu hamil",
      readTime: "7 menit",
      category: "Edukasi",
      image: "🔬",
      isPopular: false,
      content: "Imunisasi aktif memberikan kekebalan jangka panjang...",
    },
    {
      id: 8,
      title: "Vaksin yang Dilarang saat Hamil",
      excerpt: "Daftar vaksin yang tidak boleh diberikan selama kehamilan",
      readTime: "5 menit",
      category: "Keamanan",
      image: "🚫",
      isPopular: false,
      content: "Beberapa vaksin hidup tidak aman untuk ibu hamil...",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          {" "}
          <button
            onClick={() => navigate("/dashboard")}
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

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-1">
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
              <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                ⚡ Penting!
              </h3>
              <p className="text-sm text-yellow-700">
                Selalu konsultasikan dengan dokter atau bidan sebelum menerima
                vaksin apapun selama kehamilan. Jadwal imunisasi dapat
                disesuaikan dengan kondisi kesehatan individu.
              </p>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => navigate(`/edukasi/imunisasi/${article.id}`)}
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
