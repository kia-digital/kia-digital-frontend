// src/components/forms/DataMedisForm.tsx
import React from "react";
import { InputField, SelectField } from "./FormFields"; // Adjust path
import type { AppFormData } from "../../pages/Pemeriksaan/types";

interface DataMedisFormProps {
  formData: Partial<AppFormData>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const DataMedisForm: React.FC<DataMedisFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold text-gray-700 mb-6">Data Medis</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Riwayat Penyakit"
            name="riwayatPenyakit"
            placeholder="(Tuliskan riwayat penyakit)"
            optional
            value={formData.riwayatPenyakit}
            onChange={handleChange}
          />
          <InputField
            label="Riwayat Alergi"
            name="riwayatAlergi"
            placeholder="(Tuliskan riwayat alergi)"
            optional
            value={formData.riwayatAlergi}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Tinggi Badan"
            name="tinggiBadan"
            placeholder="Contoh: 160 cm"
            required
            value={formData.tinggiBadan}
            onChange={handleChange}
          />
          <InputField
            label="Berat Badan"
            name="beratBadan"
            placeholder="Contoh: 55 kg"
            required
            value={formData.beratBadan}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Status Imunisasi"
            name="statusImunisasi"
            placeholder="(Tuliskan status imunisasi)"
            optional
            value={formData.statusImunisasi}
            onChange={handleChange}
          />
          <SelectField
            label="Riwayat Kehamilan"
            name="riwayatKehamilan"
            placeholder="Pilih status"
            optional
            options={[
              { value: "Ada", label: "Ada" },
              { value: "Tidak Ada", label: "Tidak Ada" },
            ]}
            value={formData.riwayatKehamilan}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-8 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-gray-100 hover:bg-gray-200 rounded-md border border-red-600"
        >
          Batalkan
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
};

export default DataMedisForm;
