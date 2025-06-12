import React from "react";
import { useNavigate } from "react-router-dom";

const KategoriKesehatanMental: React.FC = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "Mengatasi Kecemasan Kehamilan",
      excerpt:
        "Strategi praktis untuk mengelola kecemasan dan kekhawatiran selama kehamilan",
      readTime: "8 menit",
      category: "Kecemasan",
      image: "😰",
      isPopular: true,
      content: "Kecemasan selama kehamilan adalah hal yang normal...",
    },
    {
      id: 2,
      title: "Depresi pada Ibu Hamil",
      excerpt: "Mengenali gejala dan mencari bantuan untuk depresi antenatal",
      readTime: "10 menit",
      category: "Depresi",
      image: "😔",
      isPopular: true,
      content: "Depresi kehamilan mempengaruhi 10-20% ibu hamil...",
    },
    {
      id: 3,
      title: "Teknik Relaksasi untuk Ibu Hamil",
      excerpt: "Metode relaksasi yang aman dan efektif untuk mengurangi stres",
      readTime: "7 menit",
      category: "Relaksasi",
      image: "🧘‍♀️",
      isPopular: true,
      content: "Teknik relaksasi membantu mengurangi stres dan kecemasan...",
    },
    {
      id: 4,
      title: "Bonding dengan Janin",
      excerpt:
        "Cara membangun ikatan emosional dengan bayi sejak dalam kandungan",
      readTime: "6 menit",
      category: "Bonding",
      image: "💕",
      isPopular: true,
      content:
        "Bonding prenatal sangat penting untuk perkembangan emosional...",
    },
    {
      id: 5,
      title: "Dukungan dari Pasangan",
      excerpt: "Pentingnya dukungan emosional dari pasangan selama kehamilan",
      readTime: "8 menit",
      category: "Dukungan",
      image: "👫",
      isPopular: true,
      content: "Dukungan pasangan sangat berpengaruh pada kesehatan mental...",
    },
    {
      id: 6,
      title: "Persiapan Mental Menjadi Orangtua",
      excerpt:
        "Mempersiapkan diri secara psikologis untuk peran sebagai orangtua",
      readTime: "9 menit",
      category: "Persiapan",
      image: "🤱",
      isPopular: false,
      content: "Transisi menjadi orangtua memerlukan persiapan mental...",
    },
    {
      id: 7,
      title: "Mindfulness selama Kehamilan",
      excerpt: "Praktik mindfulness untuk meningkatkan kesejahteraan mental",
      readTime: "7 menit",
      category: "Mindfulness",
      image: "🌸",
      isPopular: false,
      content: "Mindfulness membantu ibu hamil tetap hadir dan tenang...",
    },
    {
      id: 8,
      title: "Mengatasi Perubahan Mood",
      excerpt:
        "Tips mengelola perubahan suasana hati yang ekstrem selama kehamilan",
      readTime: "6 menit",
      category: "Mood",
      image: "🎭",
      isPopular: false,
      content: "Perubahan hormonal dapat mempengaruhi suasana hati...",
    },
    {
      id: 9,
      title: "Kualitas Tidur dan Kesehatan Mental",
      excerpt:
        "Hubungan antara kualitas tidur dengan kesehatan mental ibu hamil",
      readTime: "8 menit",
      category: "Tidur",
      image: "😴",
      isPopular: false,
      content: "Gangguan tidur dapat memperburuk masalah kesehatan mental...",
    },
    {
      id: 10,
      title: "Kapan Mencari Bantuan Profesional",
      excerpt:
        "Tanda-tanda yang menunjukkan perlunya konsultasi dengan psikolog atau psikiater",
      readTime: "9 menit",
      category: "Bantuan",
      image: "🆘",
      isPopular: true,
      content:
        "Penting untuk mengenali kapan diperlukan bantuan profesional...",
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
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex items-center mb-4">
              <div className="text-6xl mr-6">🧠</div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Kesehatan Mental</h1>
                <p className="text-indigo-100 text-xl">
                  Kesejahteraan Psikologis Ibu Hamil
                </p>
                <p className="text-indigo-100 mt-2">
                  Panduan lengkap untuk menjaga kesehatan mental selama
                  kehamilan dan persiapan menjadi orangtua
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">10</div>
                <div className="text-sm text-indigo-100">Total Artikel</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm text-indigo-100">Topik Utama</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">~8 min</div>
                <div className="text-sm text-indigo-100">Rata-rata Baca</div>
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
                  placeholder="Cari artikel tentang kesehatan mental..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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

            {/* Mental Health Hotline */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                📞 Butuh Bantuan Segera?
              </h3>
              <p className="text-sm text-blue-700 mb-2">
                Jangan ragu untuk menghubungi layanan konseling psikologi:
              </p>
              <div className="text-sm text-blue-600 font-medium">
                • Hotline Sejiwa: 119 ext. 8
                <br />
                • RSCM Konseling: (021) 1500-135
                <br />• Halodoc: Konsultasi online 24/7
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() =>
                    navigate(`/edukasi/kesehatan-mental/${article.id}`)
                  }
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

                      <button className="text-indigo-500 hover:text-indigo-700 transition-colors">
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
              <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors">
                Muat Lebih Banyak Artikel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KategoriKesehatanMental;
