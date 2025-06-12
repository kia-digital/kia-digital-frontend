import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faClock } from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../../components/PageHeader";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  image: string;
  isPopular: boolean;
  content: string;
  fullContent?: string;
  author?: string;
  publishDate?: string;
  tags?: string[];
}

// Data artikel untuk semua kategori
const allArticles: Record<string, Article[]> = {
  "trimester-1": [
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
      fullContent: `
        <h2>Perubahan Hormonal</h2>
        <p>Trimester pertama kehamilan ditandai dengan perubahan hormonal yang signifikan. Hormon hCG (Human Chorionic Gonadotropin) mulai diproduksi setelah implantasi, yang menyebabkan berbagai gejala awal kehamilan.</p>
        
        <h2>Perubahan Fisik yang Umum Terjadi</h2>
        <h3>1. Payudara</h3>
        <ul>
          <li>Membesar dan terasa lebih sensitif</li>
          <li>Areola menjadi lebih gelap</li>
          <li>Vena terlihat lebih jelas</li>
        </ul>
        
        <h3>2. Sistem Pencernaan</h3>
        <ul>
          <li>Mual dan muntah (morning sickness)</li>
          <li>Perubahan selera makan</li>
          <li>Sembelit akibat perubahan hormonal</li>
        </ul>
        
        <h3>3. Kelelahan</h3>
        <p>Meningkatnya kadar progesteron dapat menyebabkan rasa kantuk dan kelelahan yang berlebihan.</p>
        
        <h2>Tips Mengatasi Perubahan</h2>
        <ol>
          <li>Istirahat yang cukup</li>
          <li>Makan dalam porsi kecil tapi sering</li>
          <li>Hindari makanan pemicu mual</li>
          <li>Gunakan bra yang nyaman dan supportif</li>
          <li>Konsumsi vitamin prenatal sesuai anjuran dokter</li>
        </ol>
        
        <h2>Kapan Harus Berkonsultasi dengan Dokter</h2>
        <p>Segera hubungi dokter jika mengalami:</p>
        <ul>
          <li>Muntah berlebihan (hyperemesis gravidarum)</li>
          <li>Pendarahan vaginal</li>
          <li>Nyeri perut yang hebat</li>
          <li>Demam tinggi</li>
        </ul>
      `,
      author: "Dr. Sarah Wijaya, SpOG",
      publishDate: "15 Mei 2024",
      tags: ["trimester 1", "perubahan tubuh", "hormonal", "kesehatan"],
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
      fullContent: `
        <h2>Apa itu Morning Sickness?</h2>
        <p>Morning sickness adalah kondisi mual dan muntah yang dialami oleh 70-80% ibu hamil, biasanya dimulai pada minggu ke-6 dan membaik pada minggu ke-12-14.</p>
        
        <h2>Penyebab Morning Sickness</h2>
        <ul>
          <li>Peningkatan hormon hCG dan estrogen</li>
          <li>Sensitivitas terhadap bau</li>
          <li>Kadar gula darah yang rendah</li>
          <li>Stres dan kelelahan</li>
        </ul>
        
        <h2>Tips Mengatasi Morning Sickness</h2>
        <h3>Perubahan Pola Makan:</h3>
        <ol>
          <li>Makan dalam porsi kecil tapi sering (6-8 kali sehari)</li>
          <li>Konsumsi makanan kering seperti crackers sebelum bangun tidur</li>
          <li>Hindari makanan berlemak, pedas, atau berbau menyengat</li>
          <li>Minum air putih sedikit-sedikit tapi sering</li>
        </ol>
        
        <h3>Remedies Alami:</h3>
        <ul>
          <li>Jahe: teh jahe atau permen jahe</li>
          <li>Vitamin B6 (sesuai anjuran dokter)</li>
          <li>Aromaterapi lemon atau mint</li>
          <li>Akupresur pada titik P6 di pergelangan tangan</li>
        </ul>
        
        <h2>Kapan Perlu Bantuan Medis</h2>
        <p>Segera konsultasi jika:</p>
        <ul>
          <li>Muntah lebih dari 3-4 kali sehari</li>
          <li>Tidak bisa makan atau minum apapun</li>
          <li>Berat badan turun drastis</li>
          <li>Dehidrasi (mulut kering, jarang buang air kecil)</li>
        </ul>
      `,
      author: "Dr. Maya Sari, SpOG",
      publishDate: "10 Mei 2024",
      tags: ["morning sickness", "mual", "muntah", "tips kesehatan"],
    },
  ],
  "trimester-2": [
    {
      id: 11,
      title: "Perkembangan Janin Trimester 2",
      excerpt: "Milestone penting perkembangan bayi di usia 13-27 minggu",
      readTime: "6 menit",
      category: "Perkembangan",
      image: "👶",
      isPopular: true,
      content: "Trimester kedua adalah periode emas kehamilan...",
      fullContent: `
        <h2>Periode Emas Kehamilan</h2>
        <p>Trimester kedua (minggu 13-27) sering disebut sebagai periode emas kehamilan karena gejala mual biasanya berkurang dan energi kembali.</p>
        
        <h2>Perkembangan Janin per Bulan</h2>
        <h3>Bulan ke-4 (Minggu 13-16)</h3>
        <ul>
          <li>Janin mulai bergerak aktif</li>
          <li>Jenis kelamin dapat teridentifikasi</li>
          <li>Rambut halus (lanugo) mulai tumbuh</li>
          <li>Panjang sekitar 10-15 cm</li>
        </ul>
        
        <h3>Bulan ke-5 (Minggu 17-20)</h3>
        <ul>
          <li>Ibu mulai merasakan gerakan janin (quickening)</li>
          <li>Vernix (lapisan pelindung) terbentuk</li>
          <li>Sidik jari mulai terbentuk</li>
          <li>Berat sekitar 300-450 gram</li>
        </ul>
        
        <h3>Bulan ke-6 (Minggu 21-24)</h3>
        <ul>
          <li>Mata mulai terbuka</li>
          <li>Otak berkembang pesat</li>
          <li>Paru-paru mulai memproduksi surfaktan</li>
          <li>Berat sekitar 600-900 gram</li>
        </ul>
        
        <h2>Perubahan pada Ibu</h2>
        <ul>
          <li>Perut membesar dan mulai terlihat</li>
          <li>Garis gelap (linea nigra) muncul</li>
          <li>Stretch marks mungkin mulai muncul</li>
          <li>Peningkatan aliran darah</li>
        </ul>
        
        <h2>Pemeriksaan Penting</h2>
        <ul>
          <li>USG anatomi (minggu 18-22)</li>
          <li>Tes darah rutin</li>
          <li>Skrining diabetes gestasional</li>
          <li>Pemantauan tekanan darah</li>
        </ul>
      `,
      author: "Dr. Rina Hartono, SpOG",
      publishDate: "20 Mei 2024",
      tags: ["trimester 2", "perkembangan janin", "USG", "pemeriksaan"],
    },
  ],
  "trimester-3": [
    {
      id: 21,
      title: "Persiapan Persalinan",
      excerpt: "Panduan lengkap mempersiapkan diri menjelang persalinan",
      readTime: "8 menit",
      category: "Persiapan",
      image: "🏥",
      isPopular: true,
      content:
        "Trimester ketiga adalah waktu untuk mempersiapkan persalinan...",
      fullContent: `
        <h2>Persiapan Fisik</h2>
        <h3>Tas Persalinan</h3>
        <p>Siapkan tas persalinan sejak minggu ke-36:</p>
        <ul>
          <li>Dokumen: KTP, BPJS, buku KIA</li>
          <li>Pakaian ibu dan bayi</li>
          <li>Perlengkapan mandi</li>
          <li>Pembalut nifas</li>
          <li>Bra menyusui</li>
        </ul>
        
        <h3>Latihan Pernapasan</h3>
        <ol>
          <li>Teknik pernapasan dalam</li>
          <li>Latihan relaksasi</li>
          <li>Posisi persalinan yang nyaman</li>
          <li>Senam hamil rutin</li>
        </ol>
        
        <h2>Persiapan Mental</h2>
        <ul>
          <li>Kelas persiapan persalinan</li>
          <li>Diskusi dengan pasangan</li>
          <li>Rencana persalinan (birth plan)</li>
          <li>Dukungan keluarga</li>
        </ul>
        
        <h2>Tanda-Tanda Persalinan</h2>
        <h3>Tanda Awal:</h3>
        <ul>
          <li>Kontraksi Braxton Hicks meningkat</li>
          <li>Bayi turun ke panggul</li>
          <li>Keluar lendir bercampur darah</li>
          <li>Diare ringan</li>
        </ul>
        
        <h3>Tanda Aktif (Segera ke RS):</h3>
        <ul>
          <li>Kontraksi teratur 5 menit sekali</li>
          <li>Ketuban pecah</li>
          <li>Pendarahan aktif</li>
          <li>Gerakan janin berkurang drastis</li>
        </ul>
      `,
      author: "Dr. Lisa Andriani, SpOG",
      publishDate: "25 Mei 2024",
      tags: ["persalinan", "persiapan", "tas persalinan", "tanda persalinan"],
    },
  ],
  imunisasi: [
    {
      id: 31,
      title: "Jadwal Imunisasi Ibu Hamil",
      excerpt: "Vaksin yang aman dan diperlukan selama kehamilan",
      readTime: "5 menit",
      category: "Imunisasi",
      image: "💉",
      isPopular: true,
      content:
        "Imunisasi selama kehamilan penting untuk melindungi ibu dan bayi...",
      fullContent: `
        <h2>Pentingnya Imunisasi Selama Kehamilan</h2>
        <p>Imunisasi selama kehamilan melindungi ibu dari penyakit berbahaya dan memberikan antibodi kepada bayi melalui plasenta.</p>
        
        <h2>Vaksin yang Direkomendasikan</h2>
        <h3>1. Vaksin Tetanus Toxoid (TT)</h3>
        <ul>
          <li>Diberikan 2 kali selama kehamilan</li>
          <li>TT1: segera setelah hamil</li>
          <li>TT2: 4 minggu setelah TT1</li>
          <li>Melindungi dari tetanus neonatorum</li>
        </ul>
        
        <h3>2. Vaksin Influenza</h3>
        <ul>
          <li>Aman diberikan kapan saja selama kehamilan</li>
          <li>Mengurangi risiko komplikasi influenza</li>
          <li>Memberikan perlindungan pada bayi hingga 6 bulan</li>
        </ul>
        
        <h3>3. Vaksin Tdap (Tetanus, Difteri, Pertusis)</h3>
        <ul>
          <li>Diberikan pada trimester 3 (minggu 27-36)</li>
          <li>Melindungi bayi dari batuk rejan</li>
          <li>Antibodi bertahan 2-3 bulan pada bayi</li>
        </ul>
        
        <h2>Vaksin yang Harus Dihindari</h2>
        <ul>
          <li>MMR (Measles, Mumps, Rubella)</li>
          <li>Varicella (Cacar air)</li>
          <li>HPV</li>
          <li>Vaksin hidup lainnya</li>
        </ul>
        
        <h2>Efek Samping dan Perhatian</h2>
        <h3>Efek Samping Ringan:</h3>
        <ul>
          <li>Nyeri di tempat suntikan</li>
          <li>Demam ringan</li>
          <li>Kelelahan</li>
        </ul>
        
        <h3>Kapan Konsultasi Dokter:</h3>
        <ul>
          <li>Demam tinggi > 38°C</li>
          <li>Reaksi alergi</li>
          <li>Nyeri hebat</li>
        </ul>
      `,
      author: "Dr. Andri Setiawan, SpA",
      publishDate: "5 Juni 2024",
      tags: ["imunisasi", "vaksin", "tetanus", "influenza", "keamanan"],
    },
  ],
  "asupan-gizi": [
    {
      id: 41,
      title: "Nutrisi Lengkap untuk Ibu Hamil",
      excerpt:
        "Panduan gizi seimbang untuk mendukung perkembangan janin optimal",
      readTime: "7 menit",
      category: "Nutrisi",
      image: "🥗",
      isPopular: true,
      content: "Nutrisi yang tepat sangat penting untuk perkembangan janin...",
      fullContent: `
        <h2>Prinsip Gizi Seimbang Ibu Hamil</h2>
        <p>Kebutuhan gizi ibu hamil meningkat untuk mendukung pertumbuhan janin dan perubahan fisiologis ibu.</p>
        
        <h2>Makronutrien Penting</h2>
        <h3>1. Protein (71g/hari)</h3>
        <ul>
          <li>Sumber: daging, ikan, telur, kacang-kacangan</li>
          <li>Fungsi: pembentukan jaringan janin</li>
          <li>Tambahan: 25g dari kebutuhan normal</li>
        </ul>
        
        <h3>2. Karbohidrat Kompleks</h3>
        <ul>
          <li>Sumber: nasi merah, oat, ubi, kentang</li>
          <li>Fungsi: sumber energi utama</li>
          <li>Hindari: gula berlebih dan karbohidrat olahan</li>
        </ul>
        
        <h3>3. Lemak Sehat</h3>
        <ul>
          <li>Omega-3: ikan salmon, sarden, kacang walnut</li>
          <li>Fungsi: perkembangan otak dan mata janin</li>
          <li>Batasi: lemak jenuh dan trans</li>
        </ul>
        
        <h2>Mikronutrien Kritis</h2>
        <h3>Asam Folat (600 mcg/hari)</h3>
        <ul>
          <li>Sumber: sayuran hijau, jeruk, kacang</li>
          <li>Fungsi: mencegah cacat tabung saraf</li>
          <li>Suplemen: 400 mcg sejak sebelum hamil</li>
        </ul>
        
        <h3>Zat Besi (27 mg/hari)</h3>
        <ul>
          <li>Sumber: daging merah, bayam, kacang</li>
          <li>Fungsi: mencegah anemia</li>
          <li>Tips: konsumsi dengan vitamin C</li>
        </ul>
        
        <h3>Kalsium (1000 mg/hari)</h3>
        <ul>
          <li>Sumber: susu, yogurt, keju, ikan teri</li>
          <li>Fungsi: pembentukan tulang dan gigi janin</li>
        </ul>
        
        <h2>Menu Sehari-hari</h2>
        <h3>Sarapan:</h3>
        <ul>
          <li>Oatmeal dengan buah dan kacang</li>
          <li>Telur rebus</li>
          <li>Jus jeruk</li>
        </ul>
        
        <h3>Makan Siang:</h3>
        <ul>
          <li>Nasi merah</li>
          <li>Ikan salmon panggang</li>
          <li>Sayur bayam</li>
          <li>Tempe</li>
        </ul>
        
        <h3>Makan Malam:</h3>
        <ul>
          <li>Kentang rebus</li>
          <li>Ayam panggang</li>
          <li>Brokoli kukus</li>
          <li>Alpukat</li>
        </ul>
        
        <h2>Makanan yang Harus Dihindari</h2>
        <ul>
          <li>Ikan tinggi merkuri (hiu, king mackerel)</li>
          <li>Daging dan telur mentah</li>
          <li>Keju lunak tidak dipasteurisasi</li>
          <li>Alkohol dan rokok</li>
          <li>Kafein berlebihan (>200mg/hari)</li>
        </ul>
      `,
      author: "Dr. Nutrition Sari, MGizi",
      publishDate: "12 Juni 2024",
      tags: [
        "nutrisi",
        "gizi seimbang",
        "makronutrien",
        "mikronutrien",
        "menu",
      ],
    },
  ],
  "kesehatan-mental": [
    {
      id: 51,
      title: "Menjaga Kesehatan Mental Selama Kehamilan",
      excerpt: "Tips mengatasi stres dan menjaga wellbeing emosional",
      readTime: "6 menit",
      category: "Mental Health",
      image: "🧘‍♀️",
      isPopular: true,
      content: "Kesehatan mental sama pentingnya dengan kesehatan fisik...",
      fullContent: `
        <h2>Pentingnya Kesehatan Mental Ibu Hamil</h2>
        <p>Kesehatan mental ibu berpengaruh langsung pada perkembangan janin dan kesejahteraan keluarga.</p>
        
        <h2>Perubahan Emosional Normal</h2>
        <h3>Trimester 1:</h3>
        <ul>
          <li>Mood swings akibat perubahan hormonal</li>
          <li>Kecemasan tentang kehamilan</li>
          <li>Kelelahan emosional</li>
        </ul>
        
        <h3>Trimester 2:</h3>
        <ul>
          <li>Stabilitas emosional meningkat</li>
          <li>Bonding dengan janin mulai terbentuk</li>
          <li>Kegembiraan merasakan gerakan janin</li>
        </ul>
        
        <h3>Trimester 3:</h3>
        <ul>
          <li>Kecemasan menjelang persalinan</li>
          <li>Kekhawatiran tentang menjadi ibu</li>
          <li>Persiapan mental menghadapi perubahan</li>
        </ul>
        
        <h2>Strategi Menjaga Kesehatan Mental</h2>
        <h3>1. Teknik Relaksasi</h3>
        <ul>
          <li>Meditasi dan mindfulness</li>
          <li>Yoga prenatal</li>
          <li>Latihan pernapasan dalam</li>
          <li>Progressive muscle relaxation</li>
        </ul>
        
        <h3>2. Dukungan Sosial</h3>
        <ul>
          <li>Komunikasi terbuka dengan pasangan</li>
          <li>Bergabung dengan kelompok ibu hamil</li>
          <li>Maintain hubungan dengan keluarga dan teman</li>
          <li>Konseling jika diperlukan</li>
        </ul>
        
        <h3>3. Gaya Hidup Sehat</h3>
        <ul>
          <li>Tidur cukup 7-9 jam per hari</li>
          <li>Olahraga ringan teratur</li>
          <li>Nutrisi seimbang</li>
          <li>Batasi kafein dan hindari alkohol</li>
        </ul>
        
        <h2>Mengenali Tanda Bahaya</h2>
        <h3>Depresi Prenatal - Segera cari bantuan jika:</h3>
        <ul>
          <li>Sedih berkepanjangan > 2 minggu</li>
          <li>Kehilangan minat pada aktivitas</li>
          <li>Perubahan nafsu makan drastis</li>
          <li>Sulit tidur atau tidur berlebihan</li>
          <li>Perasaan tidak berharga</li>
          <li>Pikiran untuk menyakiti diri sendiri</li>
        </ul>
        
        <h3>Anxiety Disorder:</h3>
        <ul>
          <li>Kekhawatiran berlebihan</li>
          <li>Serangan panik</li>
          <li>Ketakutan irasional</li>
          <li>Gejala fisik: jantung berdebar, berkeringat</li>
        </ul>
        
        <h2>Self-Care Tips</h2>
        <ol>
          <li>Luangkan waktu untuk diri sendiri</li>
          <li>Lakukan hobi yang disukai</li>
          <li>Journaling untuk mengekspresikan perasaan</li>
          <li>Mendengarkan musik relaksasi</li>
          <li>Mandi air hangat</li>
          <li>Pijat prenatal</li>
        </ol>
        
        <h2>Kapan Mencari Bantuan Profesional</h2>
        <ul>
          <li>Gejala mengganggu aktivitas sehari-hari</li>
          <li>Pikiran untuk menyakiti diri atau janin</li>
          <li>Ketergantungan pada alkohol/obat</li>
          <li>Riwayat gangguan mental sebelumnya</li>
          <li>Dukungan keluarga minim</li>
        </ul>
      `,
      author: "Dr. Sarah Psikolog, M.Psi",
      publishDate: "18 Juni 2024",
      tags: ["kesehatan mental", "depresi", "anxiety", "self-care", "dukungan"],
    },
  ],
};

const ArtikelDetail: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const navigate = useNavigate();

  // Cari artikel berdasarkan kategori dan ID
  const categoryArticles = category ? allArticles[category] : [];
  const article = categoryArticles?.find(
    (art) => art.id === parseInt(id || "0")
  );

  if (!article) {
    return (
      <>
        <PageHeader
          title="Artikel Tidak Ditemukan"
          subtitle="Artikel yang Anda cari tidak tersedia"
          showLembarPemantauan={false}
          showUserAvatar={true}
        />
        <div className="bg-gray-100 min-h-screen p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Artikel Tidak Ditemukan
              </h2>
              <p className="text-gray-600 mb-6">
                Maaf, artikel yang Anda cari tidak tersedia.
              </p>
              <button
                onClick={() => navigate("/edukasi")}
                className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Kembali ke Edukasi
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  const getCategoryName = (cat: string) => {
    const categoryNames: Record<string, string> = {
      "trimester-1": "Trimester I",
      "trimester-2": "Trimester II",
      "trimester-3": "Trimester III",
      imunisasi: "Imunisasi",
      "asupan-gizi": "Asupan Gizi",
      "kesehatan-mental": "Kesehatan Mental",
    };
    return categoryNames[cat] || cat;
  };

  const getCategoryRoute = (cat: string) => {
    return `/edukasi/${cat}`;
  };
  // Artikel terkait (dari kategori yang sama) - removed for cleaner design

  return (
    <>
      <PageHeader
        title={article.title}
        subtitle={`${getCategoryName(category || "")} • ${article.readTime} • ${
          article.publishDate
        }`}
        showLembarPemantauan={false}
        showUserAvatar={true}
      />

      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          {" "}
          {/* Back Button */}
          <button
            onClick={() => navigate("/edukasi")}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 mb-6 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Kembali ke Edukasi</span>
          </button>
          {/* Article Header */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-8">
              {" "}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl">{article.image}</span>
                <div>
                  <button
                    onClick={() => navigate(getCategoryRoute(category || ""))}
                    className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-2 hover:bg-blue-200 transition-colors"
                  >
                    {getCategoryName(category || "")}
                  </button>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {article.excerpt}
              </p>{" "}
              {/* Article Meta */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 pb-6">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faClock} />
                  <span>{article.readTime}</span>
                </div>
                <div>Oleh: {article.author}</div>
                <div>{article.publishDate}</div>
              </div>
            </div>
          </div>{" "}
          {/* Article Content */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-8">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: article.fullContent || article.content,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtikelDetail;
