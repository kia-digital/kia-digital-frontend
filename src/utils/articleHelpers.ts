// Helper functions for article data handling

/**
 * Flag to force using mock data for development/testing
 * Set to true when API is not available or when testing UI
 */
export const FORCE_MOCK_DATA = false;

/**
 * Article interface that matches the API response structure
 */
export interface Article {
  id: number;
  judul: string;
  kategori: string;
  deskripsi: string;
  tag: string;
  content?: string;
  readTime?: string;
  image?: string;
  author?: string;
  publishDate?: string;
  fullContent?: string;
}

/**
 * Mock articles for fallback when API is unavailable
 */
export const mockArticles: Article[] = [
  {
    id: 1,
    judul: "Mengatasi Rasa Lelah yang Tak Tertahankan",
    kategori: "Kesehatan Ibu Hamil",
    deskripsi: "Strategi mengelola fatigue ekstrim selama kehamilan.",
    tag: "bradikardia|gula_darah_rendah",
    readTime: "5 menit",
    image: "😴",
    author: "Dr. Sari Wijaya",
    publishDate: "12 Juni 2025",
    fullContent: `
      <h2>Mengatasi Rasa Lelah yang Tak Tertahankan</h2>
      
      <p>Rasa lelah berlebihan atau fatigue adalah salah satu gejala yang paling umum dialami ibu hamil, terutama di trimester pertama dan ketiga. Kondisi ini dapat sangat mengganggu aktivitas sehari-hari jika tidak ditangani dengan baik.</p>
      
      <h3>Penyebab Utama Fatigue pada Ibu Hamil</h3>
      <ul>
        <li><strong>Perubahan Hormonal</strong>: Peningkatan progesteron dapat menyebabkan rasa kantuk berlebihan</li>
        <li><strong>Bradikardia</strong>: Penurunan denyut jantung yang dapat mengurangi suplai oksigen</li>
        <li><strong>Gula Darah Rendah</strong>: Hipoglikemia sering terjadi pada awal kehamilan</li>
        <li><strong>Perubahan Metabolisme</strong>: Tubuh bekerja ekstra untuk mendukung pertumbuhan janin</li>
      </ul>
      
      <h3>Strategi Mengelola Fatigue</h3>
      
      <h4>1. Pola Tidur yang Teratur</h4>
      <ul>
        <li>Tidur 7-9 jam setiap malam</li>
        <li>Tidur siang 20-30 menit jika diperlukan</li>
        <li>Ciptakan lingkungan tidur yang nyaman</li>
      </ul>
      
      <h4>2. Nutrisi yang Tepat</h4>
      <ul>
        <li>Makan dalam porsi kecil tapi sering</li>
        <li>Pilih makanan kaya protein dan karbohidrat kompleks</li>
        <li>Hindari makanan tinggi gula yang dapat menyebabkan crash energi</li>
        <li>Pastikan asupan zat besi cukup untuk mencegah anemia</li>
      </ul>
      
      <h4>3. Aktivitas Fisik Ringan</h4>
      <ul>
        <li>Olahraga ringan seperti jalan kaki atau yoga prenatal</li>
        <li>Hindari aktivitas yang terlalu melelahkan</li>
        <li>Lakukan peregangan secara teratur</li>
      </ul>
      
      <h3>Kapan Harus Waspada?</h3>
      <p>Segera konsultasi dengan dokter jika mengalami:</p>
      <ul>
        <li>Fatigue yang sangat ekstrim dan tidak membaik dengan istirahat</li>
        <li>Sesak napas atau nyeri dada</li>
        <li>Pusing berulang atau pingsan</li>
        <li>Gejala depresi atau kecemasan berlebihan</li>
      </ul>
    `,
  },
  {
    id: 2,
    judul: "Panduan Menjaga Tekanan Darah Normal Selama Kehamilan",
    kategori: "Kesehatan Kardiovaskular",
    deskripsi: "Tips mencegah dan mengelola hipertensi pada ibu hamil.",
    tag: "hipertensi_ringan|hipertensi_berat|prehipertensi",
    readTime: "8 menit",
    image: "❤️",
    author: "Dr. Budi Hartono",
    publishDate: "10 Juni 2025",
    fullContent: `
      <h2>Panduan Menjaga Tekanan Darah Normal Selama Kehamilan</h2>
      
      <p>Hipertensi atau tekanan darah tinggi selama kehamilan dapat membahayakan kesehatan ibu dan janin. Pemahaman yang baik tentang cara menjaga tekanan darah normal sangat penting untuk kehamilan yang sehat.</p>
      
      <h3>Klasifikasi Tekanan Darah dalam Kehamilan</h3>
      <ul>
        <li><strong>Normal</strong>: Kurang dari 120/80 mmHg</li>
        <li><strong>Prehipertensi</strong>: 120-139/80-89 mmHg</li>
        <li><strong>Hipertensi Ringan</strong>: 140-159/90-99 mmHg</li>
        <li><strong>Hipertensi Berat</strong>: 160/100 mmHg atau lebih</li>
      </ul>
      
      <h3>Cara Menjaga Tekanan Darah Normal</h3>
      
      <h4>1. Pola Makan Sehat</h4>
      <ul>
        <li>Batasi asupan garam (kurang dari 2300 mg per hari)</li>
        <li>Perbanyak konsumsi buah dan sayuran</li>
        <li>Pilih protein tanpa lemak</li>
        <li>Hindari makanan olahan dan fast food</li>
        <li>Konsumsi kalsium dan magnesium yang cukup</li>
      </ul>
      
      <h4>2. Aktivitas Fisik Teratur</h4>
      <ul>
        <li>Olahraga ringan 30 menit setiap hari</li>
        <li>Pilih aktivitas low-impact seperti berenang atau jalan kaki</li>
        <li>Konsultasikan program olahraga dengan dokter</li>
      </ul>
    `,
  },
  {
    id: 3,
    judul: "Nutrisi Penting untuk Ibu Hamil",
    kategori: "Nutrisi",
    deskripsi: "Panduan lengkap nutrisi yang dibutuhkan selama kehamilan",
    tag: "nutrisi|vitamin|asam_folat|zat_besi",
    readTime: "7 menit",
    image: "🥗",
    author: "Dr. Siti Nurhayati",
    publishDate: "5 Juni 2025",
    fullContent: `
      <h2>Nutrisi Penting untuk Ibu Hamil</h2>
      
      <p>Nutrisi yang tepat selama kehamilan sangat penting untuk kesehatan ibu dan perkembangan janin yang optimal.</p>
      
      <h3>Nutrisi Utama yang Dibutuhkan</h3>
      
      <h4>1. Asam Folat</h4>
      <ul>
        <li>Mencegah cacat tabung saraf pada janin</li>
        <li>Sumber: sayuran hijau, jeruk, kacang-kacangan</li>
        <li>Kebutuhan: 400-800 mcg per hari</li>
      </ul>
      
      <h4>2. Zat Besi</h4>
      <ul>
        <li>Mencegah anemia pada ibu hamil</li>
        <li>Sumber: daging merah, ayam, ikan, bayam</li>
        <li>Kebutuhan: 27 mg per hari</li>
      </ul>
      
      <h4>3. Kalsium</h4>
      <ul>
        <li>Penting untuk perkembangan tulang dan gigi janin</li>
        <li>Sumber: susu, keju, yogurt, ikan teri</li>
        <li>Kebutuhan: 1000 mg per hari</li>
      </ul>
    `,
  },
  {
    id: 4,
    judul: "Imunisasi Wajib untuk Bayi Baru Lahir",
    kategori: "Imunisasi",
    deskripsi: "Jadwal dan jenis imunisasi penting untuk bayi di tahun pertama",
    tag: "imunisasi|vaksin|kesehatan_bayi",
    readTime: "6 menit",
    image: "💉",
    author: "Dr. Rina Wijaya",
    publishDate: "1 Juni 2025",
    fullContent: `
      <h2>Imunisasi Wajib untuk Bayi Baru Lahir</h2>
      
      <p>Imunisasi adalah cara terbaik untuk melindungi bayi dari berbagai penyakit berbahaya. Berikut jadwal imunisasi yang direkomendasikan.</p>
      
      <h3>Jadwal Imunisasi Tahun Pertama</h3>
      
      <h4>Usia 0-2 Bulan</h4>
      <ul>
        <li>Hepatitis B (HB-0): diberikan dalam 24 jam setelah lahir</li>
        <li>BCG: untuk mencegah tuberkulosis</li>
        <li>Polio tetes (OPV-1): di usia 1 bulan</li>
      </ul>
      
      <h4>Usia 2 Bulan</h4>
      <ul>
        <li>DPT-HB-Hib 1: kombinasi untuk difteri, pertusis, tetanus, hepatitis B, dan Haemophilus influenzae</li>
        <li>Polio suntik (IPV-1)</li>
      </ul>
      
      <h4>Usia 4 Bulan</h4>
      <ul>
        <li>DPT-HB-Hib 2</li>
        <li>Polio suntik (IPV-2)</li>
      </ul>
    `,
  },
  {
    id: 5,
    judul: "Mengatasi Morning Sickness Saat Hamil",
    kategori: "Trimester I",
    deskripsi:
      "Tips praktis untuk mengurangi mual dan muntah di awal kehamilan",
    tag: "morning_sickness|mual|muntah|trimester_1",
    readTime: "4 menit",
    image: "🤢",
    author: "Dr. Ratna Wijaya",
    publishDate: "8 Juni 2025",
    fullContent: `
      <h2>Mengatasi Morning Sickness Saat Hamil</h2>
      
      <p>Morning sickness atau mual muntah kehamilan adalah kondisi umum yang dialami hingga 80% ibu hamil, terutama di trimester pertama.</p>
      
      <h3>Penyebab Morning Sickness</h3>
      <ul>
        <li>Perubahan hormonal (hCG dan estrogen)</li>
        <li>Peningkatan sensitivitas terhadap bau</li>
        <li>Lambung kosong</li>
        <li>Kelelahan dan stres</li>
      </ul>
      
      <h3>Tips Mengatasi Morning Sickness</h3>
      
      <h4>1. Pola Makan</h4>
      <ul>
        <li>Makan dalam porsi kecil tapi sering (6-8 kali sehari)</li>
        <li>Hindari makanan berlemak dan pedas</li>
        <li>Konsumsi makanan kering seperti crackers sebelum bangun tidur</li>
        <li>Minum air putih dalam jumlah cukup</li>
      </ul>
      
      <h4>2. Remedies Alami</h4>
      <ul>
        <li>Jahe: teh jahe atau permen jahe</li>
        <li>Lemon: air lemon atau menghirup aroma lemon</li>
        <li>Vitamin B6: konsultasikan dengan dokter</li>
      </ul>
    `,
  },
];

/**
 * Parse tags from pipe-separated string
 */
export function parseTags(tagString: string): string[] {
  if (!tagString) return [];
  return tagString
    .split("|")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

/**
 * Normalize article data from various API response formats
 */
export function normalizeArticle(data: any): Article | null {
  // If FORCE_MOCK_DATA is true or data is null/undefined, return mock data
  if (FORCE_MOCK_DATA || !data) {
    console.log("Using mock data for article");
    return mockArticles[0]; // Return first mock article as fallback
  }

  try {
    // Handle different possible response structures
    let article = data;

    // If response has 'detail' property (array), take the first item
    if (data.detail && Array.isArray(data.detail) && data.detail.length > 0) {
      article = data.detail[0];
    }
    // If response has 'data' property
    else if (data.data) {
      article = data.data;
      // If data.data also has 'detail' property
      if (
        article.detail &&
        Array.isArray(article.detail) &&
        article.detail.length > 0
      ) {
        article = article.detail[0];
      }
    }

    // Validate that we have the required fields
    if (!article || typeof article !== "object") {
      console.warn("Invalid article data structure, using mock data");
      return mockArticles[0];
    }

    // Create normalized article object
    const normalizedArticle: Article = {
      id: article.id || 1,
      judul: article.judul || article.title || "Judul Tidak Tersedia",
      kategori: article.kategori || article.category || "Umum",
      deskripsi:
        article.deskripsi || article.description || "Deskripsi tidak tersedia",
      tag: article.tag || article.tags || "",
      content: article.content || article.fullContent || "",
      readTime: article.readTime || "5 menit",
      image: article.image || "📝",
      author: article.author || "Tim Medis",
      publishDate:
        article.publishDate ||
        article.createdAt ||
        new Date().toLocaleDateString("id-ID"),
      fullContent: article.fullContent || article.content || "",
    };

    console.log("Successfully normalized article:", normalizedArticle);
    return normalizedArticle;
  } catch (error) {
    console.error("Error normalizing article data:", error);
    return mockArticles[0]; // Return first mock article as fallback
  }
}

/**
 * Normalize article list from various API response formats
 */
export function normalizeArticleList(data: any): Article[] {
  // If FORCE_MOCK_DATA is true or data is null/undefined, return mock data
  if (FORCE_MOCK_DATA || !data) {
    console.log("Using mock data for article list");
    return mockArticles;
  }

  try {
    let articles = [];

    // Handle different possible response structures
    if (data.detail && Array.isArray(data.detail)) {
      // API response format: { detail: [articles] }
      articles = data.detail;
    } else if (data.data && Array.isArray(data.data)) {
      // Alternative format: { data: [articles] }
      articles = data.data;
    } else if (
      data.data &&
      data.data.detail &&
      Array.isArray(data.data.detail)
    ) {
      // Nested format: { data: { detail: [articles] } }
      articles = data.data.detail;
    } else if (Array.isArray(data)) {
      // Direct array format: [articles]
      articles = data;
    } else {
      console.warn("Unknown API response format, using mock data");
      return mockArticles;
    }

    // Normalize each article in the list
    const normalizedArticles = articles
      .map((article: any) => {
        try {
          return {
            id: article.id || Math.random() * 1000,
            judul: article.judul || article.title || "Judul Tidak Tersedia",
            kategori: article.kategori || article.category || "Umum",
            deskripsi:
              article.deskripsi ||
              article.description ||
              "Deskripsi tidak tersedia",
            tag: article.tag || article.tags || "",
            content: article.content || "",
            readTime: article.readTime || "5 menit",
            image: article.image || "📝",
            author: article.author || "Tim Medis",
            publishDate:
              article.publishDate ||
              article.createdAt ||
              new Date().toLocaleDateString("id-ID"),
            fullContent: article.fullContent || article.content || "",
          };
        } catch (error) {
          console.error("Error normalizing individual article:", error);
          return null;
        }
      })
      .filter((article: Article | null) => article !== null);

    if (normalizedArticles.length === 0) {
      console.warn("No valid articles found, using mock data");
      return mockArticles;
    }

    console.log(
      `Successfully normalized ${normalizedArticles.length} articles`
    );
    return normalizedArticles;
  } catch (error) {
    console.error("Error normalizing article list:", error);
    return mockArticles; // Return mock data as fallback
  }
}
