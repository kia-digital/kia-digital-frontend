// Contoh implementasi Update dan Get ANC di Dashboard Petugas
import React, { useState } from "react";
import {
  useUpdateANCExamination,
  useGetANCExamination,
} from "../hooks/useANCOperations";

interface ExampleANCManagementProps {
  ancId?: string;
}

const ExampleANCManagement: React.FC<ExampleANCManagementProps> = ({
  ancId,
}) => {
  const [currentANCId, setCurrentANCId] = useState<string | null>(
    ancId || null
  );
  const [formData, setFormData] = useState({
    scheduled: "",
    location: "",
    medical_officer: "",
    weight: "",
    heartRate: "",
    bloodPressure: "",
    fundalHeight: "",
    bloodSugar: "",
    bodyTemperature: "",
    notes: "",
  });

  // Hooks untuk API operations
  const { data: ancData, isLoading: isLoadingANC } =
    useGetANCExamination(currentANCId);
  const updateANCMutation = useUpdateANCExamination();

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Load ANC data untuk edit
  const handleLoadANC = (ancId: string) => {
    setCurrentANCId(ancId);
  };

  // Fill form dengan data ANC
  React.useEffect(() => {
    if (ancData && ancData.detail.data) {
      const data = ancData.detail.data;
      setFormData({
        scheduled: data.scheduled,
        location: data.location,
        medical_officer: data.medical_officer,
        weight: data.checkup_result.body_weight.toString(),
        heartRate: data.checkup_result.heart_rate.toString(),
        bloodPressure: data.checkup_result.blood_pressure,
        fundalHeight: data.checkup_result.uterine_fundus_height.toString(),
        bloodSugar: data.checkup_result.blood_sugar.toString(),
        bodyTemperature: data.checkup_result.body_temperatur.toString(),
        notes: data.note,
      });
    }
  }, [ancData]);

  // Handle update ANC
  const handleUpdateANC = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentANCId) {
      alert("Tidak ada ANC ID yang dipilih!");
      return;
    }

    const updateData = {
      scheduled: formData.scheduled,
      location: formData.location,
      medical_officer: formData.medical_officer,
      checkup_result: {
        body_weight: parseFloat(formData.weight) || 0,
        heart_rate: parseFloat(formData.heartRate) || 0,
        blood_pressure: formData.bloodPressure,
        status_inquiry_anc_id: 1,
        uterine_fundus_height: parseFloat(formData.fundalHeight) || 0,
        blood_sugar: parseFloat(formData.bloodSugar) || 0,
        body_temperatur: parseFloat(formData.bodyTemperature) || 36.5,
      },
      note: formData.notes,
    };

    updateANCMutation.mutate(
      { idAnc: currentANCId, ancData: updateData },
      {
        onSuccess: () => {
          alert("Data ANC berhasil diperbarui!");
        },
        onError: (error) => {
          alert(`Gagal memperbarui data ANC: ${error.message}`);
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Manajemen Data ANC</h2>

      {/* Load ANC Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Load Data ANC</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Masukkan ANC ID"
            value={currentANCId || ""}
            onChange={(e) => setCurrentANCId(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 flex-1"
          />
          <button
            onClick={() => handleLoadANC(currentANCId || "")}
            disabled={!currentANCId || isLoadingANC}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoadingANC ? "Loading..." : "Load Data"}
          </button>
        </div>
      </div>

      {/* ANC Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">
          {currentANCId ? `Edit Data ANC (${currentANCId})` : "Data ANC"}
        </h3>

        <form onSubmit={handleUpdateANC}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Tanggal Jadwal
              </label>
              <input
                type="date"
                name="scheduled"
                value={formData.scheduled}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Lokasi</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Lokasi pemeriksaan"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Petugas Medis
              </label>
              <input
                type="text"
                name="medical_officer"
                value={formData.medical_officer}
                onChange={handleInputChange}
                placeholder="Nama petugas medis"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Berat Badan (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="65.5"
                step="0.1"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Detak Jantung (bpm)
              </label>
              <input
                type="number"
                name="heartRate"
                value={formData.heartRate}
                onChange={handleInputChange}
                placeholder="140"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Tekanan Darah
              </label>
              <input
                type="text"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleInputChange}
                placeholder="120/80"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Tinggi Fundus (cm)
              </label>
              <input
                type="number"
                name="fundalHeight"
                value={formData.fundalHeight}
                onChange={handleInputChange}
                placeholder="28"
                step="0.1"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Gula Darah (mg/dL)
              </label>
              <input
                type="number"
                name="bloodSugar"
                value={formData.bloodSugar}
                onChange={handleInputChange}
                placeholder="95"
                step="0.1"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Suhu Tubuh (°C)
              </label>
              <input
                type="number"
                name="bodyTemperature"
                value={formData.bodyTemperature}
                onChange={handleInputChange}
                placeholder="36.5"
                step="0.1"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Catatan</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Catatan pemeriksaan..."
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={!currentANCId || updateANCMutation.isPending}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
              {updateANCMutation.isPending ? "Updating..." : "Update Data ANC"}
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentANCId(null);
                setFormData({
                  scheduled: "",
                  location: "",
                  medical_officer: "",
                  weight: "",
                  heartRate: "",
                  bloodPressure: "",
                  fundalHeight: "",
                  bloodSugar: "",
                  bodyTemperature: "",
                  notes: "",
                });
              }}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>

      {/* Status Info */}
      {ancData && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-blue-800 mb-2">Informasi ANC</h4>
          <div className="text-sm text-blue-700">
            <p>
              <strong>ID:</strong> {ancData.detail.data.id}
            </p>
            <p>
              <strong>Dibuat:</strong>{" "}
              {new Date(ancData.detail.data.created_at).toLocaleString("id-ID")}
            </p>
            <p>
              <strong>Diupdate:</strong>{" "}
              {new Date(ancData.detail.data.updated_at).toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleANCManagement;

/*
CARA MENGGUNAKAN KOMPONEN INI:

1. Import di dashboard petugas:
   import ExampleANCManagement from '../components/ExampleANCManagement';

2. Gunakan dalam render:
   <ExampleANCManagement ancId="09ee5062-5761-4d79-b81c-7dc2180c1674" />

3. Atau tanpa ancId untuk form kosong:
   <ExampleANCManagement />

FITUR YANG TERSEDIA:
- ✅ Load data ANC berdasarkan ID
- ✅ Auto-fill form dengan data yang di-load
- ✅ Update data ANC
- ✅ Form validation
- ✅ Loading states
- ✅ Error handling
- ✅ Reset form functionality
- ✅ Responsive design

INTEGRASI KE DASHBOARD:
1. Tambahkan tombol "Edit" di list ANC records
2. Pass ANC ID ke komponen ini
3. Atau gunakan dalam modal/popup
4. Customize styling sesuai design system
*/
