import React from "react";
import { useNavigate } from "react-router-dom";

const KategoriKesehatanMental: React.FC = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "Mengatasi Kecemasan Kehamilan",
      excerpt:
        "Strategi mengelola rasa cemas dan khawatir yang normal selama kehamilan",
      readTime: "8 menit",
      category: "Kecemasan",
      image: "😰",
      isPopular: true,
      content:
        "Kecemasan ringan adalah normal, tapi perlu dikelola dengan baik...",
    },
    {
      id: 2,
      title: "Baby Blues vs Depresi Postpartum",
      excerpt:
        "Membedakan kondisi normal dan kapan membutuhkan bantuan profesional",
      readTime: "10 menit",
      category: "Depresi",
      image: "😢",
      isPopular: true,
      content:
        "Penting membedakan baby blues yang normal dengan depresi serius...",
    },
    {
      id: 3,
      title: "Bonding dengan Janin",
      excerpt:
        "Cara membangun ikatan emosional dengan bayi sejak dalam kandungan",
      readTime: "6 menit",
      category: "Bonding",
      image: "💕",
      isPopular: true,
      content: "Bonding prenatal membantu persiapan mental menjadi orangtua...",
    },
    {
      id: 4,
      title: "Mindfulness untuk Ibu Hamil",
      excerpt: "Teknik meditasi dan mindfulness untuk ketenangan mental",
      readTime: "7 menit",
      category: "Mindfulness",
      image: "🧘‍♀️",
      isPopular: false,
      content: "Mindfulness membantu mengurangi stres dan kecemasan...",
    },
    {
      id: 5,
      title: "Dukungan Partner dan Keluarga",
      excerpt: "Pentingnya support system dalam menjaga kesehatan mental",
      readTime: "6 menit",
      category: "Support System",
      image: "👥",
      isPopular: true,
      content: "Dukungan keluarga sangat penting untuk kesehatan mental...",
    },
    {
      id: 6,
      title: "Mengelola Mood Swings",
      excerpt: "Memahami dan mengatasi perubahan suasana hati selama kehamilan",
      readTime: "5 menit",
      category: "Mood",
      image: "🎭",
      isPopular: false,
      content: "Perubahan hormon menyebabkan fluktuasi emosi yang normal...",
    },
  ];

  const mentalHealthTips = [
    {
      category: "Relaksasi",
      tips: [
        "Latihan pernapasan dalam 5 menit setiap hari",
        "Dengarkan musik yang menenangkan",
        "Mandi air hangat sebelum tidur",
      ],
      icon: "🛁",
      color: "bg-blue-100 text-blue-700",
    },
    {
      category: "Aktivitas Fisik",
      tips: [
        "Jalan santai 15-30 menit setiap hari",
        "Yoga prenatal atau senam hamil",
        "Stretching ringan di pagi hari",
      ],
      icon: "🚶‍♀️",
      color: "bg-green-100 text-green-700",
    },
    {
      category: "Sosial",
      tips: [
        "Bergabung dengan grup ibu hamil",
        "Sharing dengan partner tentang perasaan",
        "Tetap terhubung dengan teman dan keluarga",
      ],
      icon: "👭",
      color: "bg-pink-100 text-pink-700",
    },
  ];

  const warningSignals = [
    "Sedih atau menangis terus menerus",
    "Kehilangan minat pada aktivitas sehari-hari",
    "Sulit tidur atau tidur berlebihan",
    "Perubahan nafsu makan drastis",
    "Kecemasan berlebihan tentang bayi",
    "Pikiran menyakiti diri sendiri atau bayi",
  ];

  const categories = [
    { name: "Semua", count: 6, active: true },
    { name: "Kecemasan", count: 1, active: false },
    { name: "Depresi", count: 1, active: false },
    { name: "Bonding", count: 1, active: false },
    { name: "Mindfulness", count: 1, active: false },
    { name: "Support System", count: 1, active: false },
    { name: "Mood", count: 1, active: false },
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

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex items-center mb-4">
              <div className="text-6xl mr-6">🧠</div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Kesehatan Mental</h1>
                <p className="text-indigo-100 text-xl">
                  Kesejahteraan Emosional Ibu dan Bayi
                </p>
                <p className="text-indigo-100 mt-2">
                  Dukungan untuk menjaga keseimbangan mental selama perjalanan
                  kehamilan
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm text-indigo-100">Total Artikel</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm text-indigo-100">Artikel Populer</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">~7 min</div>
                <div className="text-sm text-indigo-100">Rata-rata Baca</div>
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
                        ? "bg-indigo-100 text-indigo-700 font-medium"
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

            {/* Mental Health Tips */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                💡 Tips Kesehatan Mental
              </h3>
              <div className="space-y-4">
                {mentalHealthTips.map((tip, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-2 ${tip.color}`}
                    >
                      <span className="mr-1">{tip.icon}</span>
                      {tip.category}
                    </div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {tip.tips.map((tipItem, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          {tipItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-red-800 mb-2 flex items-center">
                🆘 Butuh Bantuan?
              </h3>
              <p className="text-sm text-red-700 mb-3">
                Jika merasa sangat tertekan atau memiliki pikiran menyakiti
                diri:
              </p>
              <div className="space-y-2">
                <a
                  href="tel:119"
                  className="block text-sm font-medium text-red-800 hover:text-red-900"
                >
                  📞 Hotline 119 (24 jam)
                </a>
                <a
                  href="tel:08001333555"
                  className="block text-sm font-medium text-red-800 hover:text-red-900"
                >
                  📞 Mental Health Hotline
                </a>
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                🔥 Artikel Populer
              </h3>{" "}
              <div className="space-y-4">
                {popularArticles.slice(0, 3).map((article) => (
                  <div
                    key={article.id}
                    onClick={() =>
                      navigate(`/edukasi/kesehatan-mental/${article.id}`)
                    }
                    className="border-b border-gray-100 pb-4 last:border-b-0 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
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
            {/* Warning Signs Alert */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
                ⚠️ Tanda-tanda yang Perlu Diwaspadai
              </h3>
              <p className="text-sm text-yellow-700 mb-3">
                Segera konsultasi dengan profesional jika mengalami:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {warningSignals.map((signal, index) => (
                  <div
                    key={index}
                    className="flex items-start text-sm text-yellow-700"
                  >
                    <span className="text-yellow-600 mr-2">•</span>
                    {signal}
                  </div>
                ))}
              </div>
            </div>
            {/* Self-Assessment Tool */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-indigo-800 mb-3 flex items-center">
                📝 Evaluasi Diri Singkat
              </h3>
              <p className="text-sm text-indigo-700 mb-4">
                Luangkan waktu untuk mengevaluasi perasaan Anda dalam 2 minggu
                terakhir:
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm text-gray-700">
                    Merasa sedih atau putus asa
                  </span>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                      Jarang
                    </button>
                    <button className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                      Kadang
                    </button>
                    <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                      Sering
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm text-gray-700">
                    Sulit menikmati aktivitas
                  </span>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                      Jarang
                    </button>
                    <button className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                      Kadang
                    </button>
                    <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                      Sering
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm text-gray-700">
                    Merasa sangat cemas
                  </span>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                      Jarang
                    </button>
                    <button className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                      Kadang
                    </button>
                    <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                      Sering
                    </button>
                  </div>
                </div>
              </div>
              <button className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                Lihat Hasil & Saran
              </button>
            </div>{" "}
            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
