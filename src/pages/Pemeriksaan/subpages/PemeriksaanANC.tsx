import React, { useState } from "react";
import { useRole } from "../../../contexts/RoleContext";
import {
  useANCRecords,
  type ANCCheckupData,
} from "../../../hooks/useANCRecords";
import LoadingSpinner from "../../../components/LoadingSpinner";

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

const ANCInputForm: React.FC = () => {
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
    console.log("Data ANC yang disimpan:", formData);
    // TODO: Implement API call to save ANC data
    alert("Data pemeriksaan ANC berhasil disimpan!");
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-1 h-8 bg-blue-400 rounded-full mr-4"></div>
            <h2 className="text-xl font-semibold text-gray-800">
              Input Pemeriksaan ANC
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
              Tanggal Pemeriksaan <span className="text-red-500">*</span>
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
  );
};

// Component for displaying ANC checkups (for mothers)
interface ANCCheckupCardProps {
  data: ANCCheckupData;
}

const ANCCheckupCard: React.FC<ANCCheckupCardProps> = ({ data }) => {
  const getStatusBadge = () => {
    const status = data.status || "Dijadwalkan";
    const isCompleted = status === "Terlaksana";

    if (isCompleted) {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
          {status}
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
          {status}
        </span>
      );
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center">
          <div
            className={`w-1 h-8 rounded-full mr-4 ${
              data.status === "Terlaksana" ? "bg-green-400" : "bg-yellow-400"
            }`}
          ></div>
          <h2 className="text-xl font-semibold text-gray-800">
            Pemeriksaan ANC
          </h2>
        </div>
        {getStatusBadge()}
      </div>

      {/* Schedule Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Tanggal Pemeriksaan
          </h3>
          <p className="text-gray-800">{formatDate(data.scheduledDate)}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Lokasi</h3>
          <p className="text-gray-800">{data.location || "-"}</p>
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Results */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Hasil Pemeriksaan
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Berat Badan
            </h4>
            <p className="text-gray-800">
              {data.bodyWeight ? `${data.bodyWeight} kg` : "-"}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Tekanan Darah
            </h4>
            <p className="text-gray-800">
              {data.bloodPressure ? `${data.bloodPressure} mmHg` : "-"}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Tinggi Fundus Uteri (TFU)
            </h4>
            <p className="text-gray-800">
              {data.uterineFundusHeight
                ? `${data.uterineFundusHeight} cm`
                : "-"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Detak Jantung Janin (DJJ)
            </h4>
            <p className="text-gray-800">
              {data.heartRate ? `${data.heartRate} bpm` : "-"}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Gula Darah
            </h4>
            <p className="text-gray-800">
              {data.bloodSugar ? `${data.bloodSugar} mg/dL` : "-"}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Suhu Tubuh
            </h4>
            <p className="text-gray-800">
              {data.bodyTemperature ? `${data.bodyTemperature}°C` : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PemeriksaanANC: React.FC = () => {
  const { currentUser } = useRole();

  // API Integration for ANC records
  const {
    data: ancRecords,
    isLoading: isLoadingANC,
    error: ancError,
    isError: isANCError,
  } = useANCRecords();

  if (currentUser?.role === "petugas_kesehatan") {
    // Healthcare worker view - form to input data
    return (
      <div className="flex flex-col bg-gray-50 p-7 flex-1 min-h-0 overflow-auto">
        <h1 className="text-2xl font-bold mb-2">Input Pemeriksaan ANC</h1>
        <p className="text-sm text-blue-600 mb-6">
          Formulir Input Data Antenatal Care
        </p>

        <ANCInputForm />
      </div>
    );
  }

  // Mother view - educational info + checkup results
  return (
    <div className="flex flex-col bg-gray-50 p-7 flex-1 min-h-0 overflow-auto">
      <h1 className="text-2xl font-bold">Pemeriksaan Kehamilan (ANC)</h1>
      <p className="text-sm text-primary-500 mb-4">Antenatal Care</p>

      <p className="mb-4 text-sm">
        Pemeriksaan kehamilan atau Antenatal Care (ANC) adalah serangkaian
        layanan kesehatan yang diberikan kepada ibu hamil secara rutin.
        Tujuannya adalah untuk memastikan kesehatan ibu dan janin, mendeteksi
        sejak dini risiko kehamilan, dan memberikan edukasi penting sepanjang
        masa kehamilan.
      </p>

      <h2 className="text-xl font-semibold mb-2">
        Apa Saja yang Diperiksa Saat ANC?
      </h2>
      <ol className="list-decimal list-inside text-sm mb-6">
        <li>Temu Wicara</li>
        <li>Timbang berat badan</li>
        <li>Tekanan darah</li>
        <li>Nilai status gizi</li>
        <li>Tinggi fundus uteri</li>
        <li>Tentukan presentasi janin dan denyut jantung janin</li>
        <li>Tes lab sederhana</li>
        <li>Tablet besi</li>
        <li>Tetanus toksoid</li>
        <li>Tata laksana kasus</li>
      </ol>

      <h2 className="text-xl font-semibold mb-4">Riwayat Pemeriksaan ANC</h2>

      {/* Loading State */}
      {isLoadingANC ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <LoadingSpinner
              size="lg"
              message="Memuat data pemeriksaan ANC..."
            />
          </div>
        </div>
      ) : isANCError ? (
        <div className="w-full p-8 bg-white rounded-lg border border-red-200 shadow-sm">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Gagal Memuat Data ANC
            </h3>
            <p className="text-red-600 mb-4">
              {ancError?.message ||
                "Terjadi kesalahan saat mengambil data pemeriksaan ANC"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      ) : (
        <>
          {ancRecords && ancRecords.length > 0 ? (
            ancRecords.map((checkup) => (
              <ANCCheckupCard key={checkup.id} data={checkup} />
            ))
          ) : (
            <div className="w-full p-8 bg-white rounded-lg border border-gray-200 shadow-sm text-center">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Belum Ada Data Pemeriksaan ANC
              </h3>
              <p className="text-gray-500">
                Hubungi petugas kesehatan untuk melakukan pemeriksaan ANC
                pertama Anda.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PemeriksaanANC;
