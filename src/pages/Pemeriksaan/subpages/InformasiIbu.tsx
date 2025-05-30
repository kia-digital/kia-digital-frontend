// src/pages/Pemeriksaan.tsx (or your file structure)
// For Sidebar, if it's a JS component, you might not need a specific import type or use `any` if issues arise.
// If Sidebar is TS, ensure its props are typed.

import { useState, type ReactNode } from "react";
import type { AppFormData, ModalType } from "../types";
import Modal from "../../../components/Modal";
import KontakDaruratForm from "../../../components/forms/KontakDaruratForm";
import DataDiriForm from "../../../components/forms/DataDiriForm";
import DataMedisForm from "../../../components/forms/DataMedisForm";

interface PlaceholderProps {
  className?: string;
}

const IconPlaceholder: React.FC<PlaceholderProps> = ({
  className = "w-5 h-5",
}) => <div className={`bg-gray-400 rounded ${className}`}></div>;

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
  <div
    className={`mb-2 ${
      showSeparator ? "pb-2 border-b border-pink-500 " : "" // Adjusted border color to match theme
    }`}
  >
    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
    <p className="text-sm font-medium text-gray-800">{value || "-"}</p>
  </div>
);

interface CardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  onEditClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  icon,
  children,
  className = "",
  onEditClick,
}) => (
  <div
    className={`bg-white p-4 rounded-xl shadow-sm border border-gray-200 ${className}`}
  >
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <div className="bg-pink-500 w-[3px] h-4 rounded-sm mr-2"></div>
        <h2 className="text-base font-semibold text-gray-900 flex items-center">
          {icon}
          <span className={icon ? "ml-2" : ""}>{title}</span>
        </h2>
      </div>
      {onEditClick && (
        <button
          onClick={onEditClick}
          className="bg-pink-50 text-pink-600 px-3 py-1 rounded-lg text-xs font-medium hover:bg-pink-100"
        >
          Edit
        </button>
      )}
    </div>
    {children}
  </div>
);

const InformasiIbu = () => {
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
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-6 bg-gray-50 p-7 flex-1 min-h-0">
      {/* Kolom Kiri */}
      <div className="flex-1 space-y-4 min-h-0">
        <Card
          title="Data Diri"
          icon={
            <IconPlaceholder className="text-pink-500 w-4 h-4" />
          } /* Adjusted color */
          className="flex-1"
          onEditClick={() => openModal("dataDiri")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
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
          icon={
            <IconPlaceholder className="text-pink-500 w-4 h-4" />
          } /* Adjusted color */
          className="flex-1"
          onEditClick={() => openModal("dataMedis")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
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
          </div>
        </Card>
      </div>

      {/* Kolom Kanan (Sidebar) */}
      <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
        <Card
          title="Informasi Kontak Darurat"
          icon={
            <IconPlaceholder className="text-pink-500 w-4 h-4" />
          } /* Adjusted color */
          onEditClick={() => openModal("kontakDarurat")}
        >
          <InfoRow
            label="Nama"
            value={currentData.namaKontak}
            showSeparator={false}
          />
          <InfoRow
            label="Hubungan"
            value={currentData.hubunganKontak}
            showSeparator={false}
          />
          <InfoRow
            label="Nomor Telepon"
            value={currentData.nomorTeleponKontak}
            showSeparator={false}
          />
          <InfoRow
            label="Alamat Kontak Darurat"
            value={currentData.alamatKontak}
            showSeparator={false}
          />
        </Card>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={getModalTitle()}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default InformasiIbu;
