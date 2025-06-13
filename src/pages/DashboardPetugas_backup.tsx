import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers, calculatePregnancyAge, type User } from "../hooks/useUsers";
import { useUpdateHPHT } from "../hooks/useUpdateHPHT";
import { useAddANCExamination } from "../hooks/useAddANCExamination";
import { useUpdateANCExamination, useGetANCExamination } from "../hooks/useANCOperations";
import LoadingSpinner from "../components/LoadingSpinner";

interface ANCFormData {
  checkupNumber: number;
  scheduledDate: string;
  location: string;
  officer: string;
  weight: string;
  bloodPressure: string;
  fundalHeight: string;
  fetalHe                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Batal
                  </button>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-6 py-2 border border-orange-300 text-orange-700 rounded-md hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      Batal Edit
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {isEditMode ? "Update Data ANC" : "Simpan Data ANC"}
                  </button>
                </div>;
  bloodSugar: string;
  hemoglobin: string;
  proteinUrine: string;
  bodyTemperature: string;
  notes: string;
}

const DashboardPetugas: React.FC = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, error } = useUsers();
  const updateHPHTMutation = useUpdateHPHT();
  const addANCMutation = useAddANCExamination();
  const updateANCMutation = useUpdateANCExamination();
  const [selectedMother, setSelectedMother] = useState<string | null>(null);
  const [hphtDate, setHphtDate] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingANCId, setEditingANCId] = useState<string | null>(null);
  const { data: ancRecord, isLoading: isLoadingANC } = useGetANCExamination(editingANCId);
  // Form state for ANC data
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
    bodyTemperature: "",
    notes: "",
  });
  const selectedMotherData =
    selectedMother && users
      ? users.find((user) => user.id === selectedMother)
      : null;

  // Update HPHT input when a mother is selected
  useEffect(() => {
    if (selectedMotherData && selectedMotherData.hpht) {
      // Format date to YYYY-MM-DD for input[type="date"]
      const date = new Date(selectedMotherData.hpht);
      const formattedDate = date.toISOString().split("T")[0];
      setHphtDate(formattedDate);
    } else {
      setHphtDate("");
    }
  }, [selectedMotherData]);

  // Fill form with ANC data when editing
  useEffect(() => {
    if (ancRecord && ancRecord.detail.data && isEditMode) {
      const data = ancRecord.detail.data;
      setFormData({
        checkupNumber: 1, // Default value
        scheduledDate: data.scheduled,
        location: data.location,
        officer: data.medical_officer,
        weight: data.checkup_result.body_weight.toString(),
        bloodPressure: data.checkup_result.blood_pressure,
        fundalHeight: data.checkup_result.uterine_fundus_height.toString(),
        fetalHeartRate: data.checkup_result.heart_rate.toString(),
        bloodSugar: data.checkup_result.blood_sugar.toString(),
        hemoglobin: "", // Not in API response
        proteinUrine: "", // Not in API response
        bodyTemperature: data.checkup_result.body_temperatur.toString(),
        notes: data.note,
      });
    }
  }, [ancRecord, isEditMode]);

  const handleMotherSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const motherId = e.target.value;
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

  const handleHphtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHphtDate(e.target.value);
  };

  const resetForm = () => {
    setFormData({
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
      bodyTemperature: "",
      notes: "",
    });
  };

  const handleEditANC = (ancId: string) => {
    setEditingANCId(ancId);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditingANCId(null);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMother) {
      alert("Silakan pilih ibu terlebih dahulu!");
      return;
    }

    // Transform form data to match API request structure
    const ancRequestData = {
      scheduled: formData.scheduledDate,
      location: formData.location,
      medical_officer: formData.officer,
      checkup_result: {
        body_weight: parseFloat(formData.weight) || 0,
        heart_rate: parseFloat(formData.fetalHeartRate) || 0,
        blood_pressure: formData.bloodPressure,
        status_inquiry_anc_id: 1, // Default status, might need to be configurable
        uterine_fundus_height: parseFloat(formData.fundalHeight) || 0,
        blood_sugar: parseFloat(formData.bloodSugar) || 0,
        body_temperatur: parseFloat(formData.bodyTemperature) || 36.5,
      },
      note: formData.notes,
    };

    console.log("Sending ANC data:", ancRequestData);

    if (isEditMode && editingANCId) {
      // Update existing ANC record
      updateANCMutation.mutate(
        { idAnc: editingANCId, ancData: ancRequestData },
        {
          onSuccess: () => {
            alert(
              `Data pemeriksaan ANC untuk ${selectedMotherData?.name} berhasil diperbarui!`
            );
            // Reset form and exit edit mode
            resetForm();
            setIsEditMode(false);
            setEditingANCId(null);
          },
          onError: (error) => {
            console.error("ANC update error:", error);
            alert(
              `Gagal memperbarui data pemeriksaan ANC: ${
                error instanceof Error ? error.message : "Terjadi kesalahan"
              }`
            );
          },
        }
      );
    } else {
      // Add new ANC record
      addANCMutation.mutate(
        { id: selectedMother, ancData: ancRequestData },
        {
          onSuccess: () => {
            alert(
              `Data pemeriksaan ANC untuk ${selectedMotherData?.name} berhasil disimpan!`
            );
            // Reset form after successful submission
            resetForm();
          },
          onError: (error) => {
            console.error("ANC submission error:", error);
            alert(
              `Gagal menyimpan data pemeriksaan ANC: ${
                error instanceof Error ? error.message : "Terjadi kesalahan"
              }`
            );
          },
        }
      );
    }
  };

  const handleHphtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMother) {
      alert("Silakan pilih ibu terlebih dahulu!");
      return;
    }
    if (!hphtDate) {
      alert("Silakan pilih tanggal HPHT!");
      return;
    }

    updateHPHTMutation.mutate(
      { id: selectedMother, hpht: hphtDate },
      {
        onSuccess: () => {
          alert(
            `Data HPHT untuk ${selectedMotherData?.name} berhasil diperbarui!`
          );
        },
        onError: (error) => {
          alert(
            `Gagal memperbarui HPHT: ${
              error instanceof Error ? error.message : "Terjadi kesalahan"
            }`
          );
        },
      }
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" message="Memuat data users..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-red-200">
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
          <h3 className="text-xl font-semibold text-red-800 mb-4">
            Gagal Memuat Data
          </h3>
          <p className="text-red-600 mb-4">
            {error?.message || "Terjadi kesalahan saat mengambil data users"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

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
                  {users?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} - {calculatePregnancyAge(user.hpht)}
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
                    {selectedMotherData.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-600">
                    Usia Kehamilan
                  </label>
                  <p className="text-blue-900 font-medium">
                    {calculatePregnancyAge(selectedMotherData.hpht)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-600">
                    HPHT
                  </label>
                  <p className="text-blue-900 font-medium">
                    {selectedMotherData.hpht
                      ? new Date(selectedMotherData.hpht).toLocaleDateString(
                          "id-ID"
                        )
                      : "Belum diisi"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-600">
                    ID User
                  </label>
                  <p className="text-blue-900 font-medium text-xs">
                    {selectedMotherData.id}
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
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Suhu Tubuh <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="bodyTemperature"
                          value={formData.bodyTemperature}
                          onChange={handleInputChange}
                          placeholder="36.5"
                          step="0.1"
                          min="35"
                          max="42"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                          required
                        />
                        <span className="absolute right-3 top-2 text-sm text-gray-500">
                          °C
                        </span>
                      </div>
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

          {/* HPHT Form */}
          {selectedMother && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Form Pengisian HPHT
              </h2>
              <form onSubmit={handleHphtSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    HPHT <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="hpht"
                    value={hphtDate}
                    onChange={handleHphtChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

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
                    Simpan HPHT
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
