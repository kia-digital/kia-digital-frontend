import React from "react";
import PageHeader from "../components/PageHeader";

const Edukasi: React.FC = () => {
  const featuredArticles = [
    {
      id: 1,
      title: "Tips Mengatasi Morning Sickness",
      excerpt: "Cara efektif mengurangi mual dan muntah di trimester pertama",
      readTime: "5 min",
      category: "Trimester 1",
    },
    {
      id: 2,
      title: "Nutrisi Penting untuk Ibu Hamil",
      excerpt: "Daftar makanan bergizi yang wajib dikonsumsi ibu hamil",
      readTime: "7 min",
      category: "Asupan Gizi",
    },
    {
      id: 3,
      title: "Persiapan Mental Menghadapi Persalinan",
      excerpt: "Tips mengatasi kecemasan dan mempersiapkan diri secara mental",
      readTime: "6 min",
      category: "Kesehatan Mental",
    },
  ];

  return (
    <>
      <PageHeader
        title="Edukasi"
        subtitle="Pelajari informasi penting seputar kehamilan dan kesehatan ibu"
        showLembarPemantauan={true}
        showUserAvatar={true}
      />{" "}
      <div className="p-8 bg-gray-100 min-h-screen">
        {/* Welcome Banner */}
        <div className="bg-gradient rounded-xl shadow-sm h-[270px] flex items-center justify-between p-8 mb-12">
          <div className="text-white flex-1">
            <h2 className="text-3xl font-bold mb-4">Selamat Belajar!</h2>
            <p className="text-base text-pink-100 leading-relaxed max-w-3xl text-justify">
              Temukan berbagai informasi penting seputar kehamilan dan kesehatan
              ibu. Pelajari tips berguna, panduan nutrisi, dan persiapan
              persalinan melalui artikel-artikel pilihan yang telah disusun
              khusus untuk mendampingi perjalanan kehamilan Anda dengan lebih
              baik dan informatif.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Featured Articles Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Artikel Pilihan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-pink-100 to-pink-200 rounded-t-xl flex items-center justify-center">
                  <div className="text-6xl">📚</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>{" "}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <div className="text-4xl mb-4">🚧</div>
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Fitur Dalam Pengembangan
          </h3>
          <p className="text-blue-600">
            Halaman edukasi sedang dalam tahap pengembangan. Artikel dan konten
            edukasi akan segera tersedia untuk membantu perjalanan kehamilan
            Anda.
          </p>
        </div>
      </div>
    </>
  );
};

export default Edukasi;
