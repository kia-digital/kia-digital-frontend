// filepath: /Users/ptsau/Projects/dicoding-projects/kia-digital-frontend/src/pages/DashboardPetugas.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data untuk daftar ibu
const mockIbuData = [
  {
    id: 1,
    nama: "Ibu Hanifah",
    usia: 26,
    usiaKehamilan: "17 minggu 1 hari",
    kondisi: "Sehat",
    lastCheckup: "2025-03-15",
    nextCheckup: "2025-04-09",
    telepon: "0878111525",
    alamat: "Jl. Sutera Narada II, Pakulonan",
  },
  {
    id: 2,
    nama: "Ibu Sari",
    usia: 28,
    usiaKehamilan: "24 minggu 3 hari",
    kondisi: "Sehat",
    lastCheckup: "2025-03-10",
    nextCheckup: "2025-04-15",
    telepon: "0812345678",
    alamat: "Jl. Merdeka No. 123, Jakarta",
  },
  {
    id: 3,
    nama: "Ibu Maria",
    usia: 24,
    usiaKehamilan: "32 minggu 5 hari",
    kondisi: "Perlu Perhatian",
    lastCheckup: "2025-03-08",
    nextCheckup: "2025-04-05",
    telepon: "0823456789",
    alamat: "Jl. Sudirman No. 456, Bandung",
  },
  {
    id: 4,
    nama: "Ibu Rina",
    usia: 30,
    usiaKehamilan: "12 minggu 2 hari",
    kondisi: "Sehat",
    lastCheckup: "2025-03-12",
    nextCheckup: "2025-04-20",
    telepon: "0834567890",
    alamat: "Jl. Pahlawan No. 789, Surabaya",
  },
  {
    id: 5,
    nama: "Ibu Linda",
    usia: 27,
    usiaKehamilan: "38 minggu 1 hari",
    kondisi: "Sehat",
    lastCheckup: "2025-03-18",
    nextCheckup: "2025-04-01",
    telepon: "0845678901",
    alamat: "Jl. Diponegoro No. 321, Yogyakarta",
  },
];

interface ANCFormData {
  checkupNumber: number;
  scheduledDate: string;
  location: string;
  officer: string;
  weight: string;
  bloodPressure: string;
  fundalHeight: string;
  fetalHeartRate: string;
  bloodSugar: string;
  hemoglobin: string;
  proteinUrine: string;
  notes: string;
}

const DashboardPetugas: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMother, setSelectedMother] = useState<number | null>(null);
  const [formData, setFormData] = useState<ANCFormData>({
    checkupNumber: 1,
    scheduledDate: "",
    location: "",
    officer: "",
    weight: "",
    bloodPressure: "",
    fundalHeight: "",
    fetalHeartRate: "",
    bloodSugar: "",
    hemoglobin: "",
    proteinUrine: "",
    notes: "",
  });

  const selectedMotherData = selectedMother
    ? mockIbuData.find((ibu) => ibu.id === selectedMother)
    : null;

  const handleMotherSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const motherId = parseInt(e.target.value);
    setSelectedMother(motherId || null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMother) {
      alert("Silakan pilih ibu terlebih dahulu!");
      return;
    }
    console.log(
      "Data ANC yang disimpan untuk ibu ID:",
      selectedMother,
      formData
    );
    // TODO: Implement API call to save ANC data
    alert(
      `Data pemeriksaan ANC untuk ${selectedMotherData?.nama} berhasil disimpan!`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Dashboard Petugas Kesehatan
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Form Pemeriksaan ANC untuk ibu hamil
            </p>
          </div>

          {/* Mother Selection */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Pilih Ibu untuk Pemeriksaan
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Ibu <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedMother || ""}
                  onChange={handleMotherSelect}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Pilih ibu...</option>
                  {mockIbuData.map((ibu) => (
                    <option key={ibu.id} value={ibu.id}>
                      {ibu.nama} - {ibu.usiaKehamilan}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Selected Mother Info */}
          {selectedMotherData && (
            <div className="bg-blue-50 rounded-xl p-6 shadow-sm border border-blue-200 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                Informasi Ibu yang Dipilih
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-blue-600">
                    Nama
                  </label>
                  <p className="text-blue-900 font-medium">
                    {selectedMotherData.nama}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-600">
                    Usia
                  </label>
                  <p className="text-blue-900 font-medium">
                    {selectedMotherData.usia} tahun
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-600">
                    Usia Kehamilan
                  </label>
                  <p className="text-blue-900 font-medium">
                    {selectedMotherData.usiaKehamilan}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-600">
                    Kondisi
                  </label>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      selectedMotherData.kondisi === "Sehat"
                        ? "bg-green-100 text-green-800"
                        : selectedMotherData.kondisi === "Perlu Perhatian"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedMotherData.kondisi}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-600">
                    Telepon
                  </label>
                  <p className="text-blue-900 font-medium">
                    {selectedMotherData.telepon}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-600">
                    Alamat
                  </label>
                  <p className="text-blue-900 font-medium">
                    {selectedMotherData.alamat}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ANC Form */}
          {selectedMother && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <form onSubmit={handleSubmit}>
                {/* Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="w-1 h-8 bg-blue-400 rounded-full mr-4"></div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Form Pemeriksaan ANC
                    </h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-600">
                      Pemeriksaan ke-
                    </label>
                    <select
                      name="checkupNumber"
                      value={formData.checkupNumber}
                      onChange={handleInputChange}
                      className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Schedule Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Tanggal Pemeriksaan{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="scheduledDate"
                      value={formData.scheduledDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Lokasi Pemeriksaan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Puskesmas/RS/Klinik"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Petugas Pemeriksa <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="officer"
                      value={formData.officer}
                      onChange={handleInputChange}
                      placeholder="Nama dokter/bidan"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <hr className="border-gray-200 mb-6" />

                {/* Examination Results */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Hasil Pemeriksaan
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Berat Badan <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleInputChange}
                          placeholder="65"
                          step="0.1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                          required
                        />
                        <span className="absolute right-3 top-2 text-sm text-gray-500">
                          kg
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Tekanan Darah <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="bloodPressure"
                        value={formData.bloodPressure}
                        onChange={handleInputChange}
                        placeholder="120/80"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <small className="text-gray-500">
                        Format: Sistolik/Diastolik
                      </small>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Tinggi Fundus Uteri (TFU){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="fundalHeight"
                          value={formData.fundalHeight}
                          onChange={handleInputChange}
                          placeholder="28"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                          required
                        />
                        <span className="absolute right-3 top-2 text-sm text-gray-500">
                          cm
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Detak Jantung Janin (DJJ){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="fetalHeartRate"
                          value={formData.fetalHeartRate}
                          onChange={handleInputChange}
                          placeholder="140"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                          required
                        />
                        <span className="absolute right-3 top-2 text-sm text-gray-500">
                          bpm
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Gula Darah
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="bloodSugar"
                          value={formData.bloodSugar}
                          onChange={handleInputChange}
                          placeholder="95"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-14"
                        />
                        <span className="absolute right-3 top-2 text-sm text-gray-500">
                          mg/dL
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Hemoglobin (Hb)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="hemoglobin"
                          value={formData.hemoglobin}
                          onChange={handleInputChange}
                          placeholder="12.5"
                          step="0.1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                        />
                        <span className="absolute right-3 top-2 text-sm text-gray-500">
                          g/dL
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Protein Urin
                      </label>
                      <select
                        name="proteinUrine"
                        value={formData.proteinUrine}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Pilih hasil</option>
                        <option value="negative">Negatif (-)</option>
                        <option value="trace">Trace (±)</option>
                        <option value="positive1">Positif 1 (+)</option>
                        <option value="positive2">Positif 2 (++)</option>
                        <option value="positive3">Positif 3 (+++)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200 mb-4" />

                {/* Notes */}
                <div className="mb-6">
                  <label className="block text-lg font-medium text-gray-800 mb-2">
                    Catatan Pemeriksaan
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Tulis catatan atau rekomendasi untuk ibu hamil..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Simpan Data ANC
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Instructions if no mother selected */}
          {!selectedMother && (
            <div className="bg-amber-50 rounded-xl p-6 shadow-sm border border-amber-200 text-center">
              <div className="text-amber-600 mb-3">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                Pilih Ibu untuk Memulai Pemeriksaan
              </h3>
              <p className="text-amber-700">
                Silakan pilih nama ibu dari dropdown di atas untuk memulai form
                pemeriksaan ANC.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPetugas;
