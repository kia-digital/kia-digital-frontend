// src/components/forms/KontakDaruratForm.tsx
import React from "react";
import { InputField, SelectField } from "./FormFields"; // Adjust path
import type { AppFormData } from "../../pages/Pemeriksaan/types";

interface KontakDaruratFormProps {
  formData: Partial<AppFormData>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const KontakDaruratForm: React.FC<KontakDaruratFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold text-gray-700 mb-6">
        Informasi Kontak Darurat
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Nama"
            name="namaKontak"
            placeholder="(Tuliskan nama kontak)"
            required
            value={formData.namaKontak}
            onChange={handleChange}
          />
          <SelectField
            label="Hubungan"
            name="hubunganKontak"
            placeholder="Pilih Hubungan"
            required
            options={[
              { value: "Suami", label: "Suami" },
              { value: "Istri", label: "Istri" },
              { value: "Orang Tua", label: "Orang Tua" },
              { value: "Saudara Kandung", label: "Saudara Kandung" },
              { value: "Lainnya", label: "Lainnya" },
            ]}
            value={formData.hubunganKontak}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Nomor Telepon"
            name="nomorTeleponKontak"
            placeholder="(08-xxx-xxx)"
            required
            value={formData.nomorTeleponKontak}
            onChange={handleChange}
          />
          <InputField
            label="Alamat Kontak Darurat"
            name="alamatKontak"
            placeholder="(Tuliskan alamat)"
            optional
            value={formData.alamatKontak}
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

export default KontakDaruratForm;
