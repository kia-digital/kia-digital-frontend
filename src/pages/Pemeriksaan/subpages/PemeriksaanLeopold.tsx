import React, { useState } from "react";
import { useRole } from "../../../contexts/RoleContext";

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
  const { currentUser } = useRole();
  const isHealthcareWorker = currentUser.role === "petugas_kesehatan";

  // Simulasi usia kehamilan pasien dalam minggu
  const [currentPregnancyWeek] = useState(17); // 17 minggu saat ini

  // State untuk mode edit setiap Leopold
  const [editMode, setEditMode] = useState({
    leopold1: true,
    leopold2: true,
    leopold3: true,
    leopold4: true,
  });

  // State untuk status completion setiap Leopold
  const [completedLeopolds, setCompletedLeopolds] = useState({
    leopold1: false,
    leopold2: false,
    leopold3: false,
    leopold4: false,
  });

  // Function untuk menentukan Leopold mana yang dapat dilakukan
  const canPerformLeopold = (leopoldNumber: number) => {
    switch (leopoldNumber) {
      case 1:
        return currentPregnancyWeek >= 12; // Sejak trimester 1 (12 minggu)
      case 2:
      case 3:
        return currentPregnancyWeek >= 28; // Mulai akhir trimester 2 (28 minggu)
      case 4:
        return currentPregnancyWeek >= 36; // Setelah 36 minggu
      default:
        return false;
    }
  };

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

  // State untuk saran setiap Leopold
  const [leopoldSuggestions, setLeopoldSuggestions] = useState({
    leopold1: "",
    leopold2: "",
    leopold3: "",
    leopold4: "",
  });

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

  // Function untuk save Leopold individual
  const handleSaveLeopold = (leopoldNumber: number) => {
    const leopoldKey = `leopold${leopoldNumber}` as keyof typeof editMode;
    setEditMode((prev) => ({
      ...prev,
      [leopoldKey]: false,
    }));
    setCompletedLeopolds((prev) => ({
      ...prev,
      [leopoldKey]: true,
    }));
    console.log(`Leopold ${leopoldNumber} saved:`, formData[leopoldKey]);
  };
  // Function untuk cancel edit Leopold individual
  const handleCancelLeopold = (leopoldNumber: number) => {
    const leopoldKey = `leopold${leopoldNumber}` as keyof typeof formData;
    // Reset form data ke kosong untuk cancel
    if (leopoldNumber === 1) {
      setFormData((prev) => ({
        ...prev,
        leopold1: {
          posisiBagianAtas: "",
          konsistensi: "",
          keterangan: "",
        },
      }));
    } else if (leopoldNumber === 2) {
      setFormData((prev) => ({
        ...prev,
        leopold2: {
          posisiPunggungJanin: "",
          ekstremitas: "",
          keterangan: "",
        },
      }));
    } else if (leopoldNumber === 3) {
      setFormData((prev) => ({
        ...prev,
        leopold3: {
          posisiBagianBawah: "",
          engagement: "",
          keterangan: "",
        },
      }));
    } else if (leopoldNumber === 4) {
      setFormData((prev) => ({
        ...prev,
        leopold4: {
          konvergenDivergen: "",
          masukPanggul: "",
          keterangan: "",
        },
      }));
    }
  };

  // Function untuk edit Leopold yang sudah tersimpan
  const handleEditLeopold = (leopoldNumber: number) => {
    const leopoldKey = `leopold${leopoldNumber}` as keyof typeof editMode;
    setEditMode((prev) => ({
      ...prev,
      [leopoldKey]: true,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateValues();
    console.log("Data Leopold:", formData);
    // Handle form submission
  };

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

        {/* Role-based Information for Mothers */}
        {!isHealthcareWorker && (
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 mb-6 border border-pink-200">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">👩‍⚕️</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-pink-800 mb-2">
                  Informasi Pemeriksaan Leopold
                </h3>
                <p className="text-pink-700 mb-3">
                  Pemeriksaan Leopold adalah teknik pemeriksaan fisik yang
                  dilakukan oleh tenaga kesehatan untuk menentukan posisi,
                  presentasi, dan kondisi janin dalam kandungan.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/50 rounded-lg p-3">
                    <h4 className="font-medium text-pink-800 mb-1">
                      📋 Tujuan Pemeriksaan
                    </h4>
                    <ul className="text-pink-700 text-xs space-y-1">
                      <li>• Menentukan posisi dan presentasi janin</li>
                      <li>• Memperkirakan berat janin</li>
                      <li>• Menilai engagement (masuknya janin ke panggul)</li>
                    </ul>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <h4 className="font-medium text-pink-800 mb-1">
                      ⏰ Waktu Pemeriksaan
                    </h4>
                    <ul className="text-pink-700 text-xs space-y-1">
                      <li>• Leopold I: Mulai 12 minggu</li>
                      <li>• Leopold II & III: Mulai 28 minggu</li>
                      <li>• Leopold IV: Mulai 36 minggu</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-pink-100 rounded-lg">
                  <p className="text-xs text-pink-800">
                    <strong>Catatan:</strong> Halaman ini menampilkan hasil
                    pemeriksaan Leopold yang telah dilakukan oleh tenaga
                    kesehatan. Untuk pemeriksaan baru, silakan konsultasi dengan
                    bidan atau dokter kandungan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
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
              <p className="font-semibold text-gray-800">Ibu Hanifah</p>{" "}
              <p className="text-sm text-gray-500">17 minggu, 1 hari hamil</p>
            </div>
          </div>{" "}
          {/* Panduan Pemeriksaan Leopold */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              📋 Panduan Pemeriksaan Leopold
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                className={`p-4 rounded-lg border-2 ${
                  canPerformLeopold(1)
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center mb-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-2 ${
                      canPerformLeopold(1)
                        ? "bg-green-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    1
                  </div>
                  <h4 className="font-semibold text-sm">Leopold I</h4>
                </div>
                <p className="text-xs text-gray-600 mb-2">Fundus Uteri</p>
                <p className="text-xs text-gray-500">Mulai: 12 minggu</p>
                {canPerformLeopold(1) ? (
                  <div className="mt-2 text-xs text-green-600 font-medium">
                    ✅ Dapat dilakukan
                  </div>
                ) : (
                  <div className="mt-2 text-xs text-gray-500">
                    ⏳ Belum saatnya
                  </div>
                )}
              </div>

              <div
                className={`p-4 rounded-lg border-2 ${
                  canPerformLeopold(2)
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center mb-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-2 ${
                      canPerformLeopold(2)
                        ? "bg-green-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    2
                  </div>
                  <h4 className="font-semibold text-sm">Leopold II</h4>
                </div>
                <p className="text-xs text-gray-600 mb-2">Posisi Punggung</p>
                <p className="text-xs text-gray-500">Mulai: 28 minggu</p>
                {canPerformLeopold(2) ? (
                  <div className="mt-2 text-xs text-green-600 font-medium">
                    ✅ Dapat dilakukan
                  </div>
                ) : (
                  <div className="mt-2 text-xs text-gray-500">
                    ⏳ Belum saatnya
                  </div>
                )}
              </div>

              <div
                className={`p-4 rounded-lg border-2 ${
                  canPerformLeopold(3)
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center mb-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-2 ${
                      canPerformLeopold(3)
                        ? "bg-green-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    3
                  </div>
                  <h4 className="font-semibold text-sm">Leopold III</h4>
                </div>
                <p className="text-xs text-gray-600 mb-2">Bagian Bawah</p>
                <p className="text-xs text-gray-500">Mulai: 28 minggu</p>
                {canPerformLeopold(3) ? (
                  <div className="mt-2 text-xs text-green-600 font-medium">
                    ✅ Dapat dilakukan
                  </div>
                ) : (
                  <div className="mt-2 text-xs text-gray-500">
                    ⏳ Belum saatnya
                  </div>
                )}
              </div>

              <div
                className={`p-4 rounded-lg border-2 ${
                  canPerformLeopold(4)
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center mb-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-2 ${
                      canPerformLeopold(4)
                        ? "bg-green-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    4
                  </div>
                  <h4 className="font-semibold text-sm">Leopold IV</h4>
                </div>
                <p className="text-xs text-gray-600 mb-2">Engagement</p>
                <p className="text-xs text-gray-500">Mulai: 36 minggu</p>
                {canPerformLeopold(4) ? (
                  <div className="mt-2 text-xs text-green-600 font-medium">
                    ✅ Dapat dilakukan
                  </div>
                ) : (
                  <div className="mt-2 text-xs text-gray-500">
                    ⏳ Belum saatnya
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>
                  Usia kehamilan saat ini: {currentPregnancyWeek} minggu
                </strong>
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Pemeriksaan Leopold dilakukan secara bertahap sesuai
                perkembangan kehamilan
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Pemeriksaan */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {" "}
              {/* Data Umum */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Data Umum Pemeriksaan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Pemeriksaan
                    </label>
                    {isHealthcareWorker ? (
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
                    ) : (
                      <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                        {formData.tanggalPemeriksaan || "-"}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Usia Kehamilan
                    </label>
                    {isHealthcareWorker ? (
                      <input
                        type="text"
                        placeholder="32 minggu 3 hari"
                        value={formData.usiaKehamilan}
                        onChange={(e) =>
                          handleInputChange("usiaKehamilan", "", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                        {formData.usiaKehamilan || "-"}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      TFU (cm)
                    </label>
                    {isHealthcareWorker ? (
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
                    ) : (
                      <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                        {formData.tinggiSimpulUteri || "-"}
                      </div>
                    )}
                  </div>
                </div>
              </div>{" "}
              {/* Leopold 1 */}
              <div
                className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${
                  !canPerformLeopold(1) ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 ${
                        canPerformLeopold(1)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      1
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Leopold I - Pemeriksaan Fundus Uteri
                    </h3>
                  </div>
                  {!canPerformLeopold(1) && (
                    <div className="flex items-center text-orange-600 bg-orange-100 px-3 py-1 rounded-full text-sm">
                      <span className="mr-1">🔒</span>
                      Belum dapat dilakukan
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Menentukan bagian janin yang ada di fundus uteri (kepala atau
                  bokong)
                </p>

                {!canPerformLeopold(1) ? (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                    <div className="text-4xl mb-2">⏳</div>
                    <h4 className="font-semibold text-orange-800 mb-2">
                      Pemeriksaan Belum Dapat Dilakukan
                    </h4>
                    <p className="text-sm text-orange-700 mb-3">
                      Leopold I dapat dilakukan mulai usia kehamilan 12 minggu
                    </p>
                    <p className="text-xs text-orange-600">
                      Usia kehamilan saat ini: {currentPregnancyWeek} minggu
                      <br />
                      Dapat dilakukan dalam:{" "}
                      {Math.max(0, 12 - currentPregnancyWeek)} minggu lagi
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Posisi Bagian Atas
                        </label>{" "}
                        <select
                          value={formData.leopold1.posisiBagianAtas}
                          onChange={(e) =>
                            handleInputChange(
                              "leopold1",
                              "posisiBagianAtas",
                              e.target.value
                            )
                          }
                          disabled={!editMode.leopold1 || !isHealthcareWorker}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            !editMode.leopold1 || !isHealthcareWorker
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
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
                        </label>{" "}
                        <select
                          value={formData.leopold1.konsistensi}
                          onChange={(e) =>
                            handleInputChange(
                              "leopold1",
                              "konsistensi",
                              e.target.value
                            )
                          }
                          disabled={!editMode.leopold1 || !isHealthcareWorker}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            !editMode.leopold1 || !isHealthcareWorker
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <option value="">Pilih...</option>
                          <option value="keras">Keras (Kepala)</option>
                          <option value="lunak">Lunak (Bokong)</option>
                          <option value="kenyal">Kenyal</option>
                        </select>
                      </div>{" "}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kesimpulan Leopold I
                        </label>{" "}
                        <textarea
                          value={formData.leopold1.keterangan}
                          onChange={(e) =>
                            handleInputChange(
                              "leopold1",
                              "keterangan",
                              e.target.value
                            )
                          }
                          disabled={!editMode.leopold1 || !isHealthcareWorker}
                          rows={2}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            !editMode.leopold1 || !isHealthcareWorker
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                          placeholder="Kesimpulan pemeriksaan Leopold I..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Saran Leopold I
                        </label>{" "}
                        <textarea
                          value={leopoldSuggestions.leopold1}
                          onChange={(e) =>
                            setLeopoldSuggestions((prev) => ({
                              ...prev,
                              leopold1: e.target.value,
                            }))
                          }
                          disabled={!editMode.leopold1 || !isHealthcareWorker}
                          rows={2}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            !editMode.leopold1 || !isHealthcareWorker
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                          placeholder="Saran berdasarkan hasil Leopold I..."
                        />
                      </div>
                    </div>{" "}
                    {/* Action Buttons - Only visible for healthcare workers */}
                    {isHealthcareWorker && (
                      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                        {editMode.leopold1 ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleCancelLeopold(1)}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                            >
                              Batal
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveLeopold(1)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                            >
                              Simpan Leopold I
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleEditLeopold(1)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                          >
                            Ubah Data
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>{" "}
              {/* Leopold 2 */}
              <div
                className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${
                  !canPerformLeopold(2) ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 ${
                        canPerformLeopold(2)
                          ? "bg-green-500 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      2
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Leopold II - Pemeriksaan Samping Uterus
                    </h3>
                  </div>
                  {!canPerformLeopold(2) && (
                    <div className="flex items-center text-orange-600 bg-orange-100 px-3 py-1 rounded-full text-sm">
                      <span className="mr-1">🔒</span>
                      Belum dapat dilakukan
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Menentukan posisi punggung janin dan letak ekstremitas
                </p>

                {!canPerformLeopold(2) ? (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                    <div className="text-4xl mb-2">⏳</div>
                    <h4 className="font-semibold text-orange-800 mb-2">
                      Pemeriksaan Belum Dapat Dilakukan
                    </h4>
                    <p className="text-sm text-orange-700 mb-3">
                      Leopold II dapat dilakukan mulai usia kehamilan 28 minggu
                      (akhir trimester 2)
                    </p>
                    <p className="text-xs text-orange-600">
                      Usia kehamilan saat ini: {currentPregnancyWeek} minggu
                      <br />
                      Dapat dilakukan dalam:{" "}
                      {Math.max(0, 28 - currentPregnancyWeek)} minggu lagi
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Posisi Punggung Janin
                        </label>{" "}
                        <select
                          value={formData.leopold2.posisiPunggungJanin}
                          onChange={(e) =>
                            handleInputChange(
                              "leopold2",
                              "posisiPunggungJanin",
                              e.target.value
                            )
                          }
                          disabled={!editMode.leopold2 || !isHealthcareWorker}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            !editMode.leopold2 || !isHealthcareWorker
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
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
                          disabled={!editMode.leopold2 || !isHealthcareWorker}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            !editMode.leopold2 || !isHealthcareWorker
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <option value="">Pilih...</option>
                          <option value="jelas_teraba">Jelas Teraba</option>
                          <option value="kurang_jelas">Kurang Jelas</option>
                          <option value="tidak_teraba">Tidak Teraba</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kesimpulan Leopold II
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
                          disabled={!editMode.leopold2 || !isHealthcareWorker}
                          rows={2}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            !editMode.leopold2 || !isHealthcareWorker
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                          placeholder="Kesimpulan pemeriksaan Leopold II..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Saran Leopold II
                        </label>
                        <textarea
                          value={leopoldSuggestions.leopold2}
                          onChange={(e) =>
                            setLeopoldSuggestions((prev) => ({
                              ...prev,
                              leopold2: e.target.value,
                            }))
                          }
                          disabled={!editMode.leopold2 || !isHealthcareWorker}
                          rows={2}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            !editMode.leopold2 || !isHealthcareWorker
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                          placeholder="Saran berdasarkan hasil Leopold II..."
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {isHealthcareWorker && (
                      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                        {editMode.leopold2 ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleCancelLeopold(2)}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                            >
                              Batal
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveLeopold(2)}
                              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                            >
                              Simpan Leopold II
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleEditLeopold(2)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                          >
                            Ubah Data
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
              {/* Leopold 3 */}
              <div
                className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${
                  !canPerformLeopold(3) ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 ${
                        canPerformLeopold(3)
                          ? "bg-purple-500 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      3
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Leopold III - Pemeriksaan Bagian Bawah
                    </h3>
                  </div>
                  {!canPerformLeopold(3) && (
                    <div className="flex items-center text-orange-600 bg-orange-100 px-3 py-1 rounded-full text-sm">
                      <span className="mr-1">🔒</span>
                      Belum dapat dilakukan
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Menentukan bagian janin yang ada di segmen bawah rahim
                </p>

                {!canPerformLeopold(3) ? (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                    <div className="text-4xl mb-2">⏳</div>
                    <h4 className="font-semibold text-orange-800 mb-2">
                      Pemeriksaan Belum Dapat Dilakukan
                    </h4>
                    <p className="text-sm text-orange-700 mb-3">
                      Leopold III dapat dilakukan mulai usia kehamilan 28 minggu
                      (akhir trimester 2)
                    </p>
                    <p className="text-xs text-orange-600">
                      Usia kehamilan saat ini: {currentPregnancyWeek} minggu
                      <br />
                      Dapat dilakukan dalam:{" "}
                      {Math.max(0, 28 - currentPregnancyWeek)} minggu lagi
                    </p>
                  </div>
                ) : (
                  <>
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
                          disabled={!editMode.leopold3 || !isHealthcareWorker}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            !editMode.leopold3 || !isHealthcareWorker
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
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
                          disabled={!editMode.leopold3 || !isHealthcareWorker}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            !editMode.leopold3 || !isHealthcareWorker
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <option value="">Pilih...</option>
                          <option value="belum_masuk">Belum Masuk PAP</option>
                          <option value="masuk_sebagian">Masuk Sebagian</option>
                          <option value="sudah_masuk">Sudah Masuk PAP</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kesimpulan Leopold III
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
                          disabled={!editMode.leopold3 || !isHealthcareWorker}
                          rows={2}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            !editMode.leopold3 || !isHealthcareWorker
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                          placeholder="Kesimpulan pemeriksaan Leopold III..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Saran Leopold III
                        </label>
                        <textarea
                          value={leopoldSuggestions.leopold3}
                          onChange={(e) =>
                            setLeopoldSuggestions((prev) => ({
                              ...prev,
                              leopold3: e.target.value,
                            }))
                          }
                          disabled={!editMode.leopold3 || !isHealthcareWorker}
                          rows={2}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            !editMode.leopold3 || !isHealthcareWorker
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                          placeholder="Saran berdasarkan hasil Leopold III..."
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {isHealthcareWorker && (
                      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                        {editMode.leopold3 ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleCancelLeopold(3)}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                            >
                              Batal
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveLeopold(3)}
                              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                            >
                              Simpan Leopold III
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleEditLeopold(3)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                          >
                            Ubah Data
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
              {/* Leopold 4 */}
              <div
                className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${
                  !canPerformLeopold(4) ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 ${
                        canPerformLeopold(4)
                          ? "bg-orange-500 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      4
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Leopold IV - Pemeriksaan Perlimaan Pawlik
                    </h3>
                  </div>
                  {!canPerformLeopold(4) && (
                    <div className="flex items-center text-orange-600 bg-orange-100 px-3 py-1 rounded-full text-sm">
                      <span className="mr-1">🔒</span>
                      Belum dapat dilakukan
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Menentukan seberapa jauh bagian terbawah janin masuk panggul
                </p>

                {!canPerformLeopold(4) ? (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                    <div className="text-4xl mb-2">⏳</div>
                    <h4 className="font-semibold text-orange-800 mb-2">
                      Pemeriksaan Belum Dapat Dilakukan
                    </h4>
                    <p className="text-sm text-orange-700 mb-3">
                      Leopold IV dapat dilakukan mulai usia kehamilan 36 minggu
                      (engagement assessment)
                    </p>
                    <p className="text-xs text-orange-600">
                      Usia kehamilan saat ini: {currentPregnancyWeek} minggu
                      <br />
                      Dapat dilakukan dalam:{" "}
                      {Math.max(0, 36 - currentPregnancyWeek)} minggu lagi
                    </p>
                  </div>
                ) : (
                  <>
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
                          disabled={!editMode.leopold4 || !isHealthcareWorker}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            !editMode.leopold4 || !isHealthcareWorker
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
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
                          disabled={!editMode.leopold4 || !isHealthcareWorker}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            !editMode.leopold4 || !isHealthcareWorker
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kesimpulan Leopold IV
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
                          disabled={!editMode.leopold4 || !isHealthcareWorker}
                          rows={2}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            !editMode.leopold4 || !isHealthcareWorker
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                          placeholder="Kesimpulan pemeriksaan Leopold IV..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Saran Leopold IV
                        </label>
                        <textarea
                          value={leopoldSuggestions.leopold4}
                          onChange={(e) =>
                            setLeopoldSuggestions((prev) => ({
                              ...prev,
                              leopold4: e.target.value,
                            }))
                          }
                          disabled={!editMode.leopold4 || !isHealthcareWorker}
                          rows={2}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            !editMode.leopold4 || !isHealthcareWorker
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                          placeholder="Saran berdasarkan hasil Leopold IV..."
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {isHealthcareWorker && (
                      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                        {editMode.leopold4 ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleCancelLeopold(4)}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                            >
                              Batal
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveLeopold(4)}
                              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                            >
                              Simpan Leopold IV
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleEditLeopold(4)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                          >
                            Ubah Data
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </form>
          </div>{" "}
          {/* Sidebar - Tips & Referensi */}
          <div className="space-y-6">
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
            </div>

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
                  </div>
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
                  </div>
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
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Primigravida: 36-38 mg | Multigravida: saat persalinan
                  </p>
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
