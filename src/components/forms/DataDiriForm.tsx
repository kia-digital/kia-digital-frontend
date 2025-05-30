// src/components/forms/DataDiriForm.tsx
import React from "react";
import { DatePicker, InputField, SelectField } from "./FormFields"; // Adjust path
import type { AppFormData } from "../../pages/Pemeriksaan/types";

interface DataDiriFormProps {
  formData: Partial<AppFormData>; // Use Partial if not all fields are guaranteed
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // Added for form submission
  onCancel: () => void; // Added for cancel action
}

const DataDiriForm: React.FC<DataDiriFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold text-gray-700 mb-6">
        Formulir data diri
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Nama"
            name="nama"
            placeholder="(Tuliskan nama)"
            required
            value={formData.nama}
            onChange={handleChange}
          />
          <InputField
            label="Nomor Telepon"
            name="nomorTelepon"
            placeholder="(08-xxx-xxx)"
            required
            value={formData.nomorTelepon}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Tempat Lahir"
            name="tempatLahir"
            placeholder="Jakarta"
            required
            value={formData.tempatLahir}
            onChange={handleChange}
          />
          <DatePicker
            label="Tanggal Lahir"
            name="tanggalLahir"
            placeholder="DD-MM-YYYY"
            required
            value={formData.tanggalLahir}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Alamat Rumah"
            name="alamatRumah"
            placeholder="(Tuliskan alamat)"
            required
            value={formData.alamatRumah}
            onChange={handleChange}
          />
          <SelectField
            label="Status Pernikahan"
            name="statusPernikahan"
            placeholder="Pilih status"
            required // Added required based on the image's asterisk
            options={[
              { value: "Nikah", label: "Nikah" },
              { value: "Belum Nikah", label: "Belum Nikah" },
              { value: "Cerai", label: "Cerai" },
            ]}
            value={formData.statusPernikahan}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Umur"
            name="umur"
            placeholder="(Tuliskan umur)"
            required
            value={formData.umur}
            onChange={handleChange}
          />
          <InputField
            label="Golongan Darah"
            name="golonganDarah"
            placeholder="(Tuliskan Golongan Darah)"
            required
            value={formData.golonganDarah}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-8 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
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

export default DataDiriForm;
