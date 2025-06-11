import React, { useState } from "react";

interface LeopoldData {
  tanggalPemeriksaan: string;
  usiaKehamilan: string;
  tinggiSimpulUteri: string;
  leopold1: {
    posisiBagianAtas: string;
    konsistensi: string;
    keterangan: string;
  };
  leopold2: {
    posisiPunggungJanin: string;
    ekstremitas: string;
    keterangan: string;
  };
  leopold3: {
    posisiBagianBawah: string;
    engagement: string;
    keterangan: string;
  };
  leopold4: {
    konvergenDivergen: string;
    masukPanggul: string;
    keterangan: string;
  };
  denyutJantungJanin: {
    frekuensi: string;
    lokasi: string;
    kualitas: string;
  };
  gerakanJanin: string;
  estimasiBeratJanin: string;
  presentasi: string;
  posisi: string;
  kesimpulan: string;
  saran: string;
  pemeriksa: string;
}

const PemeriksaanLeopold: React.FC = () => {
  const [formData, setFormData] = useState<LeopoldData>({
    tanggalPemeriksaan: "",
    usiaKehamilan: "",
    tinggiSimpulUteri: "",
    leopold1: {
      posisiBagianAtas: "",
      konsistensi: "",
      keterangan: "",
    },
    leopold2: {
      posisiPunggungJanin: "",
      ekstremitas: "",
      keterangan: "",
    },
    leopold3: {
      posisiBagianBawah: "",
      engagement: "",
      keterangan: "",
    },
    leopold4: {
      konvergenDivergen: "",
      masukPanggul: "",
      keterangan: "",
    },
    denyutJantungJanin: {
      frekuensi: "",
      lokasi: "",
      kualitas: "",
    },
    gerakanJanin: "",
    estimasiBeratJanin: "",
    presentasi: "",
    posisi: "",
    kesimpulan: "",
    saran: "",
    pemeriksa: "",
  });
  const [riwayatPemeriksaan] = useState([
    {
      id: 1,
      tanggal: "15 Mei 2025",
      usiaKehamilan: "32 minggu",
      presentasi: "Presentasi kepala",
      djj: "142 bpm",
      status: "Normal",
      leopold1: "Bokong di fundus",
      leopold2: "Punggung kiri",
      leopold3: "Kepala belum masuk PAP",
      leopold4: "Konvergen 2/5",
      tfu: "32 cm",
      posisi: "LOA",
    },
    {
      id: 2,
      tanggal: "1 Mei 2025",
      usiaKehamilan: "30 minggu",
      presentasi: "Presentasi kepala",
      djj: "138 bpm",
      status: "Normal",
      leopold1: "Bokong di fundus",
      leopold2: "Punggung kiri",
      leopold3: "Kepala belum masuk PAP",
      leopold4: "Konvergen 1/5",
      tfu: "30 cm",
      posisi: "LOA",
    },
    {
      id: 3,
      tanggal: "17 April 2025",
      usiaKehamilan: "28 minggu",
      presentasi: "Presentasi kepala",
      djj: "144 bpm",
      status: "Normal",
      leopold1: "Bokong di fundus",
      leopold2: "Punggung kiri",
      leopold3: "Kepala belum masuk PAP",
      leopold4: "Konvergen 0/5",
      tfu: "28 cm",
      posisi: "LOA",
    },
  ]);

  // State untuk alert/notifications
  const [alerts, setAlerts] = useState<
    { type: "warning" | "error" | "info"; message: string }[]
  >([]);

  // Function untuk validasi nilai normal
  const validateValues = () => {
    const newAlerts: { type: "warning" | "error" | "info"; message: string }[] =
      [];

    // Validasi DJJ
    const djj = parseInt(formData.denyutJantungJanin.frekuensi);
    if (djj && (djj < 120 || djj > 160)) {
      newAlerts.push({
        type: "warning",
        message: `DJJ ${djj} bpm berada di luar range normal (120-160 bpm). Perlu evaluasi lebih lanjut.`,
      });
    }

    // Validasi TFU
    const tfu = parseInt(formData.tinggiSimpulUteri);
    const usiaKehamilan = parseInt(formData.usiaKehamilan);
    if (tfu && usiaKehamilan) {
      const expectedTfu = usiaKehamilan;
      if (Math.abs(tfu - expectedTfu) > 3) {
        newAlerts.push({
          type: "warning",
          message: `TFU ${tfu} cm tidak sesuai dengan usia kehamilan ${usiaKehamilan} minggu. Expected: ±${expectedTfu} cm.`,
        });
      }
    }

    // Validasi konsistensi Leopold
    if (
      formData.leopold1.posisiBagianAtas &&
      formData.leopold3.posisiBagianBawah
    ) {
      if (
        formData.leopold1.posisiBagianAtas ===
        formData.leopold3.posisiBagianBawah
      ) {
        newAlerts.push({
          type: "error",
          message:
            "Inkonsistensi: Bagian atas dan bawah janin tidak boleh sama!",
        });
      }
    }

    setAlerts(newAlerts);
  };

  const handleInputChange = (
    section: keyof LeopoldData,
    field: string,
    value: string
  ) => {
    if (typeof formData[section] === "object" && formData[section] !== null) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section] as object),
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: value,
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateValues();
    console.log("Data Leopold:", formData);
    // Handle form submission
  }; // Function untuk auto-interpretasi berdasarkan input
  const generateInterpretation = () => {
    const { leopold1, leopold2, leopold3, leopold4, denyutJantungJanin } =
      formData;

    let interpretation = "";
    let recommendations = [];

    // Interpretasi berdasarkan Leopold
    if (
      leopold1.posisiBagianAtas === "bokong" &&
      leopold3.posisiBagianBawah === "kepala"
    ) {
      interpretation += "Janin dalam presentasi kepala (vertex). ";
      if (leopold2.posisiPunggungJanin === "kiri") {
        interpretation += "Punggung janin berada di sebelah kiri maternal. ";
      } else if (leopold2.posisiPunggungJanin === "kanan") {
        interpretation += "Punggung janin berada di sebelah kanan maternal. ";
      }
    } else if (
      leopold1.posisiBagianAtas === "kepala" &&
      leopold3.posisiBagianBawah === "bokong"
    ) {
      interpretation += "Janin dalam presentasi bokong (breech). ";
      recommendations.push(
        "Konsultasi dengan dokter spesialis kandungan untuk evaluasi cara persalinan"
      );
      recommendations.push(
        "Pertimbangkan versi luar eksternal jika memungkinkan"
      );
    }

    // Interpretasi engagement
    if (leopold4.masukPanggul) {
      const engagement = leopold4.masukPanggul;
      if (engagement === "0/5" || engagement === "1/5") {
        interpretation += "Kepala janin belum engaged. ";
        if (parseInt(formData.usiaKehamilan) >= 36) {
          recommendations.push(
            "Monitor perkembangan engagement pada kunjungan berikutnya"
          );
        }
      } else if (engagement === "4/5" || engagement === "5/5") {
        interpretation += "Kepala janin sudah well-engaged. ";
      }
    }

    // Interpretasi DJJ
    const djj = parseInt(denyutJantungJanin.frekuensi);
    if (djj >= 120 && djj <= 160) {
      interpretation += "Denyut jantung janin dalam batas normal. ";
    } else if (djj < 120) {
      interpretation += "Denyut jantung janin bradikardia (< 120 bpm). ";
      recommendations.push(
        "Evaluasi kesejahteraan janin dengan CTG atau USG Doppler"
      );
      recommendations.push(
        "Pertimbangkan penyebab bradikardia (hipoksia, blok jantung, dll)"
      );
    } else if (djj > 160) {
      interpretation += "Denyut jantung janin takikardia (> 160 bpm). ";
      recommendations.push(
        "Evaluasi penyebab takikardia (demam maternal, hipoksia, infeksi)"
      );
      recommendations.push("Monitor ketat kesejahteraan janin");
    }

    // Update form dengan interpretasi
    setFormData((prev) => ({
      ...prev,
      kesimpulan: interpretation,
      saran: recommendations.join("; "),
    }));
  };

  // Function untuk mengisi template normal
  const fillNormalTemplate = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const normalTemplate: LeopoldData = {
      tanggalPemeriksaan: currentDate,
      usiaKehamilan: "32 minggu 0 hari",
      tinggiSimpulUteri: "32",
      leopold1: {
        posisiBagianAtas: "bokong",
        konsistensi: "lunak",
        keterangan: "Bokong teraba lunak dan tidak bulat di fundus uteri",
      },
      leopold2: {
        posisiPunggungJanin: "kiri",
        ekstremitas: "jelas_teraba",
        keterangan:
          "Punggung janin teraba di sebelah kiri maternal, ekstremitas di kanan",
      },
      leopold3: {
        posisiBagianBawah: "kepala",
        engagement: "belum_masuk",
        keterangan:
          "Kepala janin teraba keras dan bulat, ballotement positif, belum masuk PAP",
      },
      leopold4: {
        konvergenDivergen: "divergen",
        masukPanggul: "1/5",
        keterangan: "Kedua tangan divergen, kepala janin masuk PAP 1/5 bagian",
      },
      denyutJantungJanin: {
        frekuensi: "142",
        lokasi: "kiri_bawah",
        kualitas: "reguler",
      },
      gerakanJanin: "aktif",
      estimasiBeratJanin: "1800",
      presentasi: "presentasi_kepala",
      posisi: "loa",
      kesimpulan:
        "Janin tunggal hidup intrauterine dengan presentasi kepala, posisi LOA, belum engaged. DJJ dalam batas normal.",
      saran:
        "Lanjutkan ANC rutin sesuai jadwal. Monitor pergerakan janin. Persiapan persalinan normal.",
      pemeriksa: "Dr. Bidan Praktek",
    };
    setFormData(normalTemplate);
  };
  // Function untuk menghitung progress form
  const calculateProgress = () => {
    const fields = [
      formData.tanggalPemeriksaan,
      formData.usiaKehamilan,
      formData.tinggiSimpulUteri,
      formData.leopold1.posisiBagianAtas,
      formData.leopold1.konsistensi,
      formData.leopold2.posisiPunggungJanin,
      formData.leopold2.ekstremitas,
      formData.leopold3.posisiBagianBawah,
      formData.leopold3.engagement,
      formData.leopold4.konvergenDivergen,
      formData.leopold4.masukPanggul,
      formData.denyutJantungJanin.frekuensi,
      formData.denyutJantungJanin.lokasi,
      formData.denyutJantungJanin.kualitas,
      formData.gerakanJanin,
      formData.estimasiBeratJanin,
      formData.presentasi,
      formData.posisi,
      formData.pemeriksa,
    ];

    const filledFields = fields.filter(
      (field) => field && field.trim() !== ""
    ).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const progress = calculateProgress();
  // Effect untuk keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "s":
            e.preventDefault();
            handleSubmit(e as any);
            break;
          case "t":
            e.preventDefault();
            fillNormalTemplate();
            break;
          case "i":
            e.preventDefault();
            generateInterpretation();
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [formData]);

  // Effect untuk validasi real-time
  React.useEffect(() => {
    if (formData.denyutJantungJanin.frekuensi || formData.tinggiSimpulUteri) {
      validateValues();
    }
  }, [
    formData.denyutJantungJanin.frekuensi,
    formData.tinggiSimpulUteri,
    formData.leopold1.posisiBagianAtas,
    formData.leopold3.posisiBagianBawah,
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {" "}
      <div className="max-w-6xl mx-auto">
        {/* Alert Messages */}
        {alerts.length > 0 && (
          <div className="mb-6 space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === "error"
                    ? "bg-red-50 border-red-400 text-red-700"
                    : alert.type === "warning"
                    ? "bg-yellow-50 border-yellow-400 text-yellow-700"
                    : "bg-blue-50 border-blue-400 text-blue-700"
                }`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {alert.type === "error" ? (
                      <span className="text-red-500">⚠️</span>
                    ) : alert.type === "warning" ? (
                      <span className="text-yellow-500">⚠️</span>
                    ) : (
                      <span className="text-blue-500">ℹ️</span>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{alert.message}</p>
                  </div>
                  <div className="ml-auto pl-3">
                    <button
                      onClick={() =>
                        setAlerts(alerts.filter((_, i) => i !== index))
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Header Info */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Pemeriksaan Leopold
              </h2>
              <p className="text-gray-600 mt-1">
                Pemeriksaan fisik untuk menentukan posisi, presentasi, dan
                kondisi janin
              </p>
            </div>{" "}
            <div className="text-right">
              <p className="text-sm text-gray-500">Pasien:</p>
              <p className="font-semibold text-gray-800">Ibu Hanifah</p>
              <p className="text-sm text-gray-500">17 minggu, 1 hari hamil</p>

              {/* Quick Action Buttons */}
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={fillNormalTemplate}
                  className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                >
                  📋 Template Normal
                </button>
                <button
                  onClick={generateInterpretation}
                  className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors"
                >
                  🤖 Auto Interpretasi
                </button>
              </div>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">32</div>
              <div className="text-sm text-blue-600">Minggu Kehamilan</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">142</div>
              <div className="text-sm text-green-600">DJJ (bpm)</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">32</div>
              <div className="text-sm text-purple-600">TFU (cm)</div>
            </div>{" "}
            <div className="bg-pink-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">1800</div>
              <div className="text-sm text-pink-600">Est. Berat (gr)</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress Pengisian Form
              </span>
              <span className="text-sm text-gray-500">{progress}% Selesai</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  progress < 30
                    ? "bg-red-500"
                    : progress < 70
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {progress < 50
                ? "Lengkapi data dasar pemeriksaan Leopold"
                : progress < 90
                ? "Hampir selesai! Tambahkan kesimpulan dan saran"
                : "Form siap untuk disimpan"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Pemeriksaan */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Data Umum */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Data Umum Pemeriksaan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Pemeriksaan
                    </label>
                    <input
                      type="date"
                      value={formData.tanggalPemeriksaan}
                      onChange={(e) =>
                        handleInputChange(
                          "tanggalPemeriksaan",
                          "",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Usia Kehamilan
                    </label>
                    <input
                      type="text"
                      placeholder="32 minggu 3 hari"
                      value={formData.usiaKehamilan}
                      onChange={(e) =>
                        handleInputChange("usiaKehamilan", "", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      TFU (cm)
                    </label>
                    <input
                      type="text"
                      placeholder="32"
                      value={formData.tinggiSimpulUteri}
                      onChange={(e) =>
                        handleInputChange(
                          "tinggiSimpulUteri",
                          "",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Leopold 1 */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Leopold I - Pemeriksaan Fundus Uteri
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Menentukan bagian janin yang ada di fundus uteri (kepala atau
                  bokong)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Posisi Bagian Atas
                    </label>
                    <select
                      value={formData.leopold1.posisiBagianAtas}
                      onChange={(e) =>
                        handleInputChange(
                          "leopold1",
                          "posisiBagianAtas",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Pilih...</option>
                      <option value="kepala">Kepala</option>
                      <option value="bokong">Bokong</option>
                      <option value="tidak_jelas">Tidak Jelas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Konsistensi
                    </label>
                    <select
                      value={formData.leopold1.konsistensi}
                      onChange={(e) =>
                        handleInputChange(
                          "leopold1",
                          "konsistensi",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Pilih...</option>
                      <option value="keras">Keras (Kepala)</option>
                      <option value="lunak">Lunak (Bokong)</option>
                      <option value="kenyal">Kenyal</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keterangan Tambahan
                  </label>
                  <textarea
                    value={formData.leopold1.keterangan}
                    onChange={(e) =>
                      handleInputChange(
                        "leopold1",
                        "keterangan",
                        e.target.value
                      )
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Keterangan tambahan..."
                  />
                </div>
              </div>

              {/* Leopold 2 */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Leopold II - Pemeriksaan Samping Uterus
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Menentukan posisi punggung janin dan letak ekstremitas
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Posisi Punggung Janin
                    </label>
                    <select
                      value={formData.leopold2.posisiPunggungJanin}
                      onChange={(e) =>
                        handleInputChange(
                          "leopold2",
                          "posisiPunggungJanin",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Pilih...</option>
                      <option value="kiri">Kiri</option>
                      <option value="kanan">Kanan</option>
                      <option value="anterior">Anterior</option>
                      <option value="posterior">Posterior</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ekstremitas
                    </label>
                    <select
                      value={formData.leopold2.ekstremitas}
                      onChange={(e) =>
                        handleInputChange(
                          "leopold2",
                          "ekstremitas",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Pilih...</option>
                      <option value="jelas_teraba">Jelas Teraba</option>
                      <option value="kurang_jelas">Kurang Jelas</option>
                      <option value="tidak_teraba">Tidak Teraba</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keterangan Tambahan
                  </label>
                  <textarea
                    value={formData.leopold2.keterangan}
                    onChange={(e) =>
                      handleInputChange(
                        "leopold2",
                        "keterangan",
                        e.target.value
                      )
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Keterangan tambahan..."
                  />
                </div>
              </div>

              {/* Leopold 3 */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Leopold III - Pemeriksaan Bagian Bawah
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Menentukan bagian janin yang ada di segmen bawah rahim
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Posisi Bagian Bawah
                    </label>
                    <select
                      value={formData.leopold3.posisiBagianBawah}
                      onChange={(e) =>
                        handleInputChange(
                          "leopold3",
                          "posisiBagianBawah",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Pilih...</option>
                      <option value="kepala">Kepala</option>
                      <option value="bokong">Bokong</option>
                      <option value="tidak_jelas">Tidak Jelas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Engagement
                    </label>
                    <select
                      value={formData.leopold3.engagement}
                      onChange={(e) =>
                        handleInputChange(
                          "leopold3",
                          "engagement",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Pilih...</option>
                      <option value="belum_masuk">Belum Masuk PAP</option>
                      <option value="masuk_sebagian">Masuk Sebagian</option>
                      <option value="sudah_masuk">Sudah Masuk PAP</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keterangan Tambahan
                  </label>
                  <textarea
                    value={formData.leopold3.keterangan}
                    onChange={(e) =>
                      handleInputChange(
                        "leopold3",
                        "keterangan",
                        e.target.value
                      )
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Keterangan tambahan..."
                  />
                </div>
              </div>

              {/* Leopold 4 */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    4
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Leopold IV - Pemeriksaan Perlimaan Pawlik
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Menentukan seberapa jauh bagian terbawah janin masuk panggul
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Konvergen/Divergen
                    </label>
                    <select
                      value={formData.leopold4.konvergenDivergen}
                      onChange={(e) =>
                        handleInputChange(
                          "leopold4",
                          "konvergenDivergen",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Pilih...</option>
                      <option value="konvergen">Konvergen</option>
                      <option value="divergen">Divergen</option>
                      <option value="sejajar">Sejajar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Masuk Panggul
                    </label>
                    <select
                      value={formData.leopold4.masukPanggul}
                      onChange={(e) =>
                        handleInputChange(
                          "leopold4",
                          "masukPanggul",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Pilih...</option>
                      <option value="0/5">0/5 (Belum masuk)</option>
                      <option value="1/5">1/5 (Masuk sedikit)</option>
                      <option value="2/5">2/5 (Masuk sebagian)</option>
                      <option value="3/5">3/5 (Masuk banyak)</option>
                      <option value="4/5">4/5 (Hampir masuk)</option>
                      <option value="5/5">5/5 (Sudah masuk)</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keterangan Tambahan
                  </label>
                  <textarea
                    value={formData.leopold4.keterangan}
                    onChange={(e) =>
                      handleInputChange(
                        "leopold4",
                        "keterangan",
                        e.target.value
                      )
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Keterangan tambahan..."
                  />
                </div>
              </div>

              {/* DJJ dan Data Lainnya */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Denyut Jantung Janin & Data Lainnya
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frekuensi DJJ (bpm)
                    </label>
                    <input
                      type="text"
                      placeholder="142"
                      value={formData.denyutJantungJanin.frekuensi}
                      onChange={(e) =>
                        handleInputChange(
                          "denyutJantungJanin",
                          "frekuensi",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lokasi DJJ
                    </label>
                    <select
                      value={formData.denyutJantungJanin.lokasi}
                      onChange={(e) =>
                        handleInputChange(
                          "denyutJantungJanin",
                          "lokasi",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Pilih...</option>
                      <option value="kiri_bawah">Kiri Bawah</option>
                      <option value="kanan_bawah">Kanan Bawah</option>
                      <option value="kiri_atas">Kiri Atas</option>
                      <option value="kanan_atas">Kanan Atas</option>
                      <option value="tengah">Tengah</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kualitas DJJ
                    </label>
                    <select
                      value={formData.denyutJantungJanin.kualitas}
                      onChange={(e) =>
                        handleInputChange(
                          "denyutJantungJanin",
                          "kualitas",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Pilih...</option>
                      <option value="reguler">Reguler</option>
                      <option value="irreguler">Irreguler</option>
                      <option value="kuat">Kuat</option>
                      <option value="lemah">Lemah</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gerakan Janin
                    </label>
                    <select
                      value={formData.gerakanJanin}
                      onChange={(e) =>
                        handleInputChange("gerakanJanin", "", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Pilih...</option>
                      <option value="aktif">Aktif</option>
                      <option value="kurang_aktif">Kurang Aktif</option>
                      <option value="tidak_terasa">Tidak Terasa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Est. Berat Janin (gr)
                    </label>
                    <input
                      type="text"
                      placeholder="1800"
                      value={formData.estimasiBeratJanin}
                      onChange={(e) =>
                        handleInputChange(
                          "estimasiBeratJanin",
                          "",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Presentasi
                    </label>
                    <select
                      value={formData.presentasi}
                      onChange={(e) =>
                        handleInputChange("presentasi", "", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Pilih...</option>
                      <option value="presentasi_kepala">
                        Presentasi Kepala
                      </option>
                      <option value="presentasi_bokong">
                        Presentasi Bokong
                      </option>
                      <option value="presentasi_bahu">Presentasi Bahu</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Posisi
                    </label>
                    <select
                      value={formData.posisi}
                      onChange={(e) =>
                        handleInputChange("posisi", "", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Pilih...</option>
                      <option value="loa">LOA (Left Occiput Anterior)</option>
                      <option value="roa">ROA (Right Occiput Anterior)</option>
                      <option value="lop">LOP (Left Occiput Posterior)</option>
                      <option value="rop">ROP (Right Occiput Posterior)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Kesimpulan dan Saran */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Kesimpulan dan Saran
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kesimpulan Pemeriksaan
                    </label>
                    <textarea
                      value={formData.kesimpulan}
                      onChange={(e) =>
                        handleInputChange("kesimpulan", "", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Kesimpulan hasil pemeriksaan Leopold..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Saran dan Rekomendasi
                    </label>
                    <textarea
                      value={formData.saran}
                      onChange={(e) =>
                        handleInputChange("saran", "", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Saran untuk ibu hamil..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Pemeriksa
                    </label>
                    <input
                      type="text"
                      placeholder="Dr. Nama Dokter"
                      value={formData.pemeriksa}
                      onChange={(e) =>
                        handleInputChange("pemeriksa", "", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>{" "}
                  <button
                    type="submit"
                    className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                    title="Simpan (Ctrl+S)"
                  >
                    Simpan Pemeriksaan
                  </button>
                </div>

                {/* Keyboard Shortcuts Help */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-2 font-medium">
                    ⌨️ Keyboard Shortcuts:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-500">
                    <div>
                      <kbd className="bg-white px-1 rounded">Ctrl+S</kbd> Simpan
                    </div>
                    <div>
                      <kbd className="bg-white px-1 rounded">Ctrl+T</kbd>{" "}
                      Template
                    </div>
                    <div>
                      <kbd className="bg-white px-1 rounded">Ctrl+I</kbd>{" "}
                      Interpretasi
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar - Panduan & Riwayat */}
          <div className="space-y-6">
            {" "}
            {/* Panduan Leopold */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                📋 Panduan Pemeriksaan Leopold
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      Leopold I - Fundus Uteri
                    </p>
                    <p className="text-xs text-gray-600 mb-2">
                      Menentukan bagian janin di fundus
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Kepala: Keras, bulat, dapat digerakkan</li>
                      <li>
                        • Bokong: Lunak, tidak bulat, tidak dapat digerakkan
                      </li>
                      <li>• Kosong: Janin melintang/miring</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      Leopold II - Samping Uterus
                    </p>
                    <p className="text-xs text-gray-600 mb-2">
                      Menentukan posisi punggung janin
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Punggung: Datar, keras, tahanan besar</li>
                      <li>• Ekstremitas: Kecil-kecil, bergerak</li>
                      <li>• Posisi: Kiri/kanan maternal</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      Leopold III - Bagian Bawah
                    </p>
                    <p className="text-xs text-gray-600 mb-2">
                      Menentukan bagian terbawah janin
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Kepala: Keras, bulat, ballotement (+)</li>
                      <li>• Bokong: Lunak, tidak bulat</li>
                      <li>• Engagement: Masuk/belum masuk PAP</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      Leopold IV - Perlimaan Pawlik
                    </p>
                    <p className="text-xs text-gray-600 mb-2">
                      Menentukan seberapa dalam janin masuk panggul
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Divergen: Kepala belum masuk PAP (0-1/5)</li>
                      <li>• Sejajar: Kepala masuk sebagian (2-3/5)</li>
                      <li>• Konvergen: Kepala sudah masuk PAP (4-5/5)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Ilustrasi Posisi Janin */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                👶 Ilustrasi Posisi Janin
              </h4>
              <div className="space-y-3 text-sm">
                <div className="bg-white rounded-lg p-3 border">
                  <p className="font-medium text-gray-700">
                    LOA (Left Occiput Anterior)
                  </p>
                  <p className="text-xs text-gray-600">
                    Kepala di kiri depan - Posisi paling optimal
                  </p>
                  <div className="text-center mt-2 text-2xl">🤱</div>
                </div>
                <div className="bg-white rounded-lg p-3 border">
                  <p className="font-medium text-gray-700">
                    ROA (Right Occiput Anterior)
                  </p>
                  <p className="text-xs text-gray-600">
                    Kepala di kanan depan - Posisi normal
                  </p>
                  <div className="text-center mt-2 text-2xl">🤱</div>
                </div>
                <div className="bg-white rounded-lg p-3 border">
                  <p className="font-medium text-gray-700">Presentasi Bokong</p>
                  <p className="text-xs text-gray-600">
                    Bokong di bawah - Perlu evaluasi
                  </p>
                  <div className="text-center mt-2 text-2xl">🔄</div>
                </div>
              </div>
            </div>{" "}
            {/* Nilai Normal */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
                📊 Nilai Referensi Normal
              </h4>
              <div className="space-y-3 text-sm">
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 font-medium">
                      DJJ Normal:
                    </span>
                    <span className="text-blue-800 font-bold">120-160 bpm</span>
                  </div>{" "}
                  <p className="text-xs text-blue-600 mt-1">
                    &lt; 120: Bradikardia | &gt; 160: Takikardia
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 font-medium">
                      TFU (Tinggi Fundus Uteri):
                    </span>
                    <span className="text-blue-800 font-bold">
                      ± Usia kehamilan (minggu)
                    </span>
                  </div>{" "}
                  <p className="text-xs text-blue-600 mt-1">
                    Toleransi ±3 cm dari usia kehamilan
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 font-medium">
                      Presentasi Normal:
                    </span>
                    <span className="text-blue-800 font-bold">
                      Kepala (95%)
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Bokong: 3-4% | Lintang: 0.5%
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 font-medium">
                      Posisi Optimal:
                    </span>
                    <span className="text-blue-800 font-bold">LOA/ROA</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Anterior lebih baik dari Posterior
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 font-medium">
                      Engagement (≥36 minggu):
                    </span>
                    <span className="text-blue-800 font-bold">3/5 - 5/5</span>
                  </div>{" "}
                  <p className="text-xs text-blue-600 mt-1">
                    Primigravida: 36-38 mg | Multigravida: saat persalinan
                  </p>
                </div>
              </div>
            </div>
            {/* Tips Praktis */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-4 flex items-center">
                💡 Tips Praktis Pemeriksaan
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <p className="text-green-700">
                    <strong>Persiapan:</strong> Kandung kemih kosong, posisi
                    terlentang, relaksasi otot perut
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <p className="text-green-700">
                    <strong>Teknik:</strong> Gunakan ujung jari, tekanan lembut
                    tapi tegas
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <p className="text-green-700">
                    <strong>Interpretasi:</strong> Konfirmasi dengan USG jika
                    hasil meragukan
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <p className="text-green-700">
                    <strong>Dokumentasi:</strong> Catat semua temuan dengan
                    jelas dan konsisten
                  </p>
                </div>
              </div>
            </div>{" "}
            {/* Riwayat Pemeriksaan */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  📋 Riwayat Pemeriksaan
                </h3>
                <button className="text-xs text-blue-600 hover:text-blue-800 underline">
                  Lihat Semua
                </button>
              </div>
              <div className="space-y-3">
                {riwayatPemeriksaan.map((riwayat) => (
                  <div
                    key={riwayat.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {riwayat.tanggal}
                        </p>
                        <p className="text-xs text-gray-500">
                          {riwayat.usiaKehamilan}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          riwayat.status === "Normal"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {riwayat.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="space-y-1">
                        <p className="text-gray-600">
                          <span className="font-medium">TFU:</span>{" "}
                          {riwayat.tfu}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">DJJ:</span>{" "}
                          {riwayat.djj}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Posisi:</span>{" "}
                          {riwayat.posisi}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-600">
                          <span className="font-medium">L1:</span>{" "}
                          {riwayat.leopold1}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">L2:</span>{" "}
                          {riwayat.leopold2}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">L4:</span>{" "}
                          {riwayat.leopold4}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">Presentasi:</span>{" "}
                        {riwayat.presentasi}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Aksi Cepat
                </h4>
                <div className="space-y-2">
                  <button className="w-full text-left text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-colors">
                    📊 Lihat Grafik Perkembangan
                  </button>
                  <button className="w-full text-left text-xs text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded transition-colors">
                    📄 Ekspor Laporan PDF
                  </button>
                  <button className="w-full text-left text-xs text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded transition-colors">
                    📱 Kirim ke WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PemeriksaanLeopold;
