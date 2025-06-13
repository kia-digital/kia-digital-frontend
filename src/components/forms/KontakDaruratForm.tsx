// src/components/forms/KontakDaruratForm.tsx
import React from "react";
import { InputField, SelectField } from "./FormFields"; // Adjust path
import { useRelationships } from "../../hooks/useRelationships";
import LoadingSpinner from "../LoadingSpinner";
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
  const {
    data: relationships,
    isLoading: isLoadingRelationships,
    isError,
  } = useRelationships();

  // Convert relationships data to options format
  const relationshipOptions =
    relationships?.map((rel) => ({
      value: rel.id.toString(),
      label: rel.name,
    })) || [];

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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hubungan <span className="text-red-500">*</span>
            </label>
            {isLoadingRelationships ? (
              <div className="flex items-center justify-center p-3 border border-gray-300 rounded-md bg-gray-50">
                <LoadingSpinner size="sm" />
                <span className="ml-2 text-sm text-gray-500">
                  Memuat opsi hubungan...
                </span>
              </div>
            ) : isError ? (
              <div className="p-3 border border-red-300 rounded-md bg-red-50">
                <span className="text-sm text-red-600">
                  Gagal memuat data hubungan
                </span>
              </div>
            ) : (
              <SelectField
                label=""
                name="hubunganKontak"
                placeholder="Pilih Hubungan"
                required
                options={relationshipOptions}
                value={formData.hubunganKontak}
                onChange={handleChange}
              />
            )}
          </div>
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
