// src/pages/Pemeriksaan.tsx (or your file structure)
// For Sidebar, if it's a JS component, you might not need a specific import type or use `any` if issues arise.
// If Sidebar is TS, ensure its props are typed.

import { useState, type ReactNode } from "react";
import { useRole } from "../../../contexts/RoleContext";
import type { AppFormData, ModalType } from "../types";
import Modal from "../../../components/Modal";
import KontakDaruratForm from "../../../components/forms/KontakDaruratForm";
import DataDiriForm from "../../../components/forms/DataDiriForm";
import DataMedisForm from "../../../components/forms/DataMedisForm";

interface InfoRowProps {
  label: string;
  value?: string; // Value can be optional if data is missing
  showSeparator?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  showSeparator = true,
}) => (
  <div className={`mb-4 ${showSeparator ? "pb-2" : ""}`}>
    <h4 className="text-sm font-medium text-gray-600 mb-1">{label}</h4>
    <p className="text-gray-800">{value || "-"}</p>
  </div>
);

interface CardProps {
  title: string;
  children: ReactNode;
  className?: string;
  onEditClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  className = "",
  onEditClick,
}) => (
  <div
    className={`w-full p-6 bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
  >
    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-1 h-8 bg-primary-500 rounded-full mr-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {onEditClick && (
        <button
          onClick={onEditClick}
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium cursor-pointer"
        >
          Edit
        </button>
      )}
    </div>
    {children}
  </div>
);

const InformasiIbu = () => {
  const { currentUser } = useRole();
  const isMotherRole = currentUser.role === "ibu";

  // Utility functions for HPHT calculations
  const calculatePregnancyInfo = (hpht: string) => {
    if (!hpht) return { usia: "-", hpl: "-", trimester: "-" };

    const hphtDate = new Date(hpht);
    const today = new Date();
    const diffTime = today.getTime() - hphtDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    // HPL (Hari Perkiraan Lahir) = HPHT + 280 hari
    const hpl = new Date(hphtDate.getTime() + 280 * 24 * 60 * 60 * 1000);

    // Determine trimester
    let trimester = "-";
    if (weeks <= 12) trimester = "I";
    else if (weeks <= 28) trimester = "II";
    else if (weeks <= 40) trimester = "III";

    return {
      usia: `${weeks} minggu ${days} hari`,
      hpl: hpl.toLocaleDateString("id-ID"),
      trimester: `Trimester ${trimester}`,
    };
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>("");
  const [currentData, setCurrentData] = useState<AppFormData>({
    // Initial Data - ensure all required fields from AppFormData are present
    nama: "Hanifah Perestoika",
    nomorTelepon: "0878111525",
    tempatLahir: "Jakarta",
    tanggalLahir: "15/08/1987",
    alamatRumah: "Jl. Sutera Narada II, Pakulonan",
    statusPernikahan: "Nikah",
    umur: "26",
    golonganDarah: "A",
    riwayatPenyakit: "-",
    riwayatAlergi: "-",
    tinggiBadan: "168 cm",
    beratBadan: "65 kg",
    statusImunisasi: "-",
    riwayatKehamilan: "Tidak Ada", // Example, ensure this aligns with SelectOption values
    hpht: "2024-10-01", // Example HPHT date
    namaKontak: "Suami Hanifah", // Example: distinct name for emergency contact
    hubunganKontak: "Suami",
    nomorTeleponKontak: "0878111525", // Should be contact's number
    alamatKontak: "Jl. Sutera Narada II, Pakulonan",
  });
  // Temporary state for form data within the modal
  const [modalFormData, setModalFormData] = useState<Partial<AppFormData>>({});
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
    setModalFormData({}); // Clear modal form data on close
  };
  const openModal = (type: ModalType) => {
    setModalType(type);
    // Initialize modal form data with current data relevant to the modal type
    // This helps in pre-filling the form when editing
    setModalFormData({
      nama: currentData.nama,
      nomorTelepon: currentData.nomorTelepon,
      tempatLahir: currentData.tempatLahir,
      tanggalLahir: currentData.tanggalLahir,
      alamatRumah: currentData.alamatRumah,
      statusPernikahan: currentData.statusPernikahan,
      umur: currentData.umur,
      golonganDarah: currentData.golonganDarah,
      riwayatPenyakit: currentData.riwayatPenyakit,
      riwayatAlergi: currentData.riwayatAlergi,
      tinggiBadan: currentData.tinggiBadan,
      beratBadan: currentData.beratBadan,
      statusImunisasi: currentData.statusImunisasi,
      riwayatKehamilan: currentData.riwayatKehamilan,
      hpht: currentData.hpht,
      namaKontak: currentData.namaKontak,
      hubunganKontak: currentData.hubunganKontak,
      nomorTeleponKontak: currentData.nomorTeleponKontak,
      alamatKontak: currentData.alamatKontak,
    });
    setIsModalOpen(true);
  };
  const getModalTitle = (): string => {
    switch (modalType) {
      case "dataDiri":
        return "Edit Data Diri";
      case "dataMedis":
        return "Edit Data Medis";
      case "kontakDarurat":
        return "Edit Informasi Kontak Darurat";
      case "hpht":
        return "Edit Informasi HPHT";
      default:
        return "Edit Informasi";
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setModalFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here, you would typically validate modalFormData
    // and then update currentData or send to an API
    setCurrentData((prev) => ({ ...prev, ...(modalFormData as AppFormData) })); // Type assertion here assumes modalFormData is complete for the update
    console.log("Updated data:", { ...currentData, ...modalFormData });
    closeModal();
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "dataDiri":
        return (
          <DataDiriForm
            formData={modalFormData}
            handleChange={handleFormChange}
            handleSubmit={handleFormSubmit}
            onCancel={closeModal}
          />
        );
      case "dataMedis":
        return (
          <DataMedisForm
            formData={modalFormData}
            handleChange={handleFormChange}
            handleSubmit={handleFormSubmit}
            onCancel={closeModal}
          />
        );
      case "kontakDarurat":
        return (
          <KontakDaruratForm
            formData={modalFormData}
            handleChange={handleFormChange}
            handleSubmit={handleFormSubmit}
            onCancel={closeModal}
          />
        );
      case "hpht":
        return (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-blue-800 mb-2">
                📅 Informasi HPHT
              </h4>
              <p className="text-sm text-blue-700">
                HPHT (Hari Pertama Haid Terakhir) digunakan untuk menghitung
                usia kehamilan dan perkiraan tanggal lahir. Pastikan tanggal
                yang dimasukkan akurat.
              </p>
            </div>

            <div>
              <label
                htmlFor="hpht"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tanggal HPHT *
              </label>
              <input
                type="date"
                id="hpht"
                name="hpht"
                value={modalFormData.hpht || ""}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Pilih tanggal hari pertama menstruasi terakhir
              </p>
            </div>

            {modalFormData.hpht && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-medium text-green-800 mb-2">
                  📊 Perhitungan Otomatis
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-green-700 font-medium">
                      Usia Kehamilan:
                    </span>
                    <p className="text-green-800">
                      {calculatePregnancyInfo(modalFormData.hpht).usia}
                    </p>
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">HPL:</span>
                    <p className="text-green-800">
                      {calculatePregnancyInfo(modalFormData.hpht).hpl}
                    </p>
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">
                      Trimester:
                    </span>
                    <p className="text-green-800">
                      {calculatePregnancyInfo(modalFormData.hpht).trimester}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Simpan
              </button>
            </div>
          </form>
        );
      default:
        return null;
    }
  };
  return (
    <div className="flex flex-col bg-gray-50 p-7 flex-1 min-h-0 overflow-auto">
      <h1 className="text-2xl font-bold mb-2">Informasi Ibu</h1>
      <p className="text-sm text-primary-500 mb-6">
        Data Pribadi dan Medis Ibu Hamil
      </p>

      {/* Role-based Information */}
      {!isMotherRole && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">👩‍⚕️</span>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-blue-800 mb-1">
                Akses Read-Only untuk Petugas Kesehatan
              </h3>
              <p className="text-xs text-blue-700">
                Sebagai petugas kesehatan, Anda dapat melihat semua informasi
                ibu untuk keperluan pemeriksaan dan konsultasi. Data pribadi dan
                medis hanya dapat diubah oleh ibu yang bersangkutan untuk
                menjaga akurasi dan privasi.
              </p>
            </div>
          </div>
        </div>
      )}

      {isMotherRole && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">👤</span>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-green-800 mb-1">
                Kelola Informasi Pribadi Anda
              </h3>
              <p className="text-xs text-green-700">
                Anda dapat mengubah dan memperbarui informasi pribadi, data
                medis, HPHT, dan kontak darurat. Pastikan data yang dimasukkan
                akurat untuk mendukung pemeriksaan dan perawatan yang optimal.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-6">
        <Card
          title="Data Diri"
          onEditClick={isMotherRole ? () => openModal("dataDiri") : undefined}
        >
          {!isMotherRole && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <div className="flex items-center">
                <span className="text-yellow-600 mr-2">ℹ️</span>
                <p className="text-sm text-yellow-800">
                  Data ini hanya dapat diedit oleh ibu. Anda dapat melihat
                  informasi untuk keperluan pemeriksaan.
                </p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InfoRow label="Nama" value={currentData.nama} />
              <InfoRow label="Tempat Lahir" value={currentData.tempatLahir} />
              <InfoRow label="Alamat Rumah" value={currentData.alamatRumah} />
              <InfoRow
                label="Umur"
                value={currentData.umur}
                showSeparator={false}
              />
            </div>
            <div>
              <InfoRow label="Nomor Telepon" value={currentData.nomorTelepon} />
              <InfoRow label="Tanggal Lahir" value={currentData.tanggalLahir} />
              <InfoRow
                label="Status Pernikahan"
                value={currentData.statusPernikahan}
              />
              <InfoRow
                label="Golongan Darah"
                value={currentData.golonganDarah}
                showSeparator={false}
              />
            </div>
          </div>
        </Card>
        <Card
          title="Data Medis"
          onEditClick={isMotherRole ? () => openModal("dataMedis") : undefined}
        >
          {!isMotherRole && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <div className="flex items-center">
                <span className="text-yellow-600 mr-2">ℹ️</span>
                <p className="text-sm text-yellow-800">
                  Data medis hanya dapat diedit oleh ibu. Informasi ini dapat
                  digunakan sebagai referensi untuk pemeriksaan.
                </p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InfoRow
                label="Riwayat Penyakit"
                value={currentData.riwayatPenyakit}
              />
              <InfoRow label="Tinggi Badan" value={currentData.tinggiBadan} />
              <InfoRow
                label="Status Imunisasi"
                value={currentData.statusImunisasi}
                showSeparator={false}
              />
            </div>
            <div>
              <InfoRow
                label="Riwayat Alergi"
                value={currentData.riwayatAlergi}
              />
              <InfoRow label="Berat Badan" value={currentData.beratBadan} />
              <InfoRow
                label="Riwayat Kehamilan"
                value={currentData.riwayatKehamilan}
                showSeparator={false}
              />
            </div>
          </div>{" "}
        </Card>
        <Card
          title="Informasi HPHT & Kehamilan"
          onEditClick={isMotherRole ? () => openModal("hpht") : undefined}
        >
          {!isMotherRole && currentData.hpht && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <div className="flex items-center">
                <span className="text-yellow-600 mr-2">ℹ️</span>
                <p className="text-sm text-yellow-800">
                  Data HPHT hanya dapat diedit oleh ibu. Anda dapat melihat
                  informasi ini untuk referensi pemeriksaan.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InfoRow
                label="HPHT (Hari Pertama Haid Terakhir)"
                value={
                  currentData.hpht
                    ? new Date(currentData.hpht).toLocaleDateString("id-ID")
                    : "-"
                }
              />
              {currentData.hpht && (
                <InfoRow
                  label="Usia Kehamilan"
                  value={calculatePregnancyInfo(currentData.hpht).usia}
                  showSeparator={false}
                />
              )}
            </div>
            <div>
              {currentData.hpht && (
                <>
                  <InfoRow
                    label="HPL (Hari Perkiraan Lahir)"
                    value={calculatePregnancyInfo(currentData.hpht).hpl}
                  />
                  <InfoRow
                    label="Trimester Saat Ini"
                    value={calculatePregnancyInfo(currentData.hpht).trimester}
                    showSeparator={false}
                  />
                </>
              )}
              {!currentData.hpht && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="text-center">
                    <span className="text-gray-400 text-3xl">📅</span>
                    <p className="text-sm text-gray-600 mt-2">
                      {isMotherRole
                        ? "Klik tombol Edit untuk menambahkan data HPHT"
                        : "Data HPHT belum diisi"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>{" "}
        <Card
          title="Informasi Kontak Darurat"
          onEditClick={
            isMotherRole ? () => openModal("kontakDarurat") : undefined
          }
        >
          {!isMotherRole && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <div className="flex items-center">
                <span className="text-yellow-600 mr-2">ℹ️</span>
                <p className="text-sm text-yellow-800">
                  Informasi kontak darurat hanya dapat diedit oleh ibu untuk
                  menjaga privasi dan keakuratan data.
                </p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InfoRow label="Nama" value={currentData.namaKontak} />
              <InfoRow label="Hubungan" value={currentData.hubunganKontak} />
            </div>
            <div>
              <InfoRow
                label="Nomor Telepon"
                value={currentData.nomorTeleponKontak}
              />
              <InfoRow
                label="Alamat Kontak Darurat"
                value={currentData.alamatKontak}
                showSeparator={false}
              />
            </div>
          </div>
        </Card>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={getModalTitle()}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default InformasiIbu;
