// src/pages/Pemeriksaan.tsx (or your file structure)
// For Sidebar, if it's a JS component, you might not need a specific import type or use `any` if issues arise.
// If Sidebar is TS, ensure its props are typed.

import { useState, useEffect, type ReactNode } from "react";
import { useRole } from "../../../contexts/RoleContext";
import type { AppFormData, ModalType } from "../types";
import Modal from "../../../components/Modal";
import KontakDaruratForm from "../../../components/forms/KontakDaruratForm";
import DataDiriForm from "../../../components/forms/DataDiriForm";
import DataMedisForm from "../../../components/forms/DataMedisForm";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useUserInformation, useUpdateUserInformation, mapMaritalStatusToId } from "../../../hooks/useUserInformation";

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
  
  // API Integration
  const { data: userInformation, isLoading: isLoadingInfo, error, isError } = useUserInformation();
  const updateUserMutation = useUpdateUserInformation();
  
  // UI State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

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
    // Initial default data - will be replaced by API data
    nama: "",
    nomorTelepon: "",
    tempatLahir: "",
    tanggalLahir: "",
    alamatRumah: "",
    statusPernikahan: "",
    umur: "",
    golonganDarah: "",
    riwayatPenyakit: "",
    riwayatAlergi: "",
    tinggiBadan: "",
    beratBadan: "",
    statusImunisasi: "",
    riwayatKehamilan: "",
    hpht: "2024-10-01", // Keep HPHT as fallback for pregnancy calculations
    namaKontak: "",
    hubunganKontak: "",
    nomorTeleponKontak: "",
    alamatKontak: "",
  });

  // Update currentData when userInformation changes
  useEffect(() => {
    if (userInformation) {
      const data = userInformation;
      setCurrentData((prev) => ({
        ...prev,
        nama: data.personal_info.name || "",
        nomorTelepon: data.personal_info.telp || "",
        tempatLahir: data.personal_info.birth_place || "",
        tanggalLahir: data.personal_info.date_of_birth || "",
        alamatRumah: data.personal_info.address || "",
        statusPernikahan: data.personal_info.marital_status || "",
        umur: data.personal_info.age?.toString() || "",
        golonganDarah: data.personal_info.blood_group || "",
        riwayatPenyakit: data.medical_record.disease_history || "",
        riwayatAlergi: data.medical_record.allergies_history || "",
        tinggiBadan: data.medical_record.body_height?.toString() || "",
        beratBadan: data.medical_record.body_weight?.toString() || "",
        statusImunisasi: data.medical_record.immunization_status || "",
        riwayatKehamilan: data.medical_record.pregnancy_history || "",
        namaKontak: data.personal_info.emergency_contact.name || "",
        hubunganKontak: data.personal_info.emergency_contact.relationship || "",
        nomorTeleponKontak: data.personal_info.emergency_contact.telp || "",
        alamatKontak: data.personal_info.emergency_contact.address || "",
      }));
    }
  }, [userInformation]);
  // Temporary state for form data within the modal
  const [modalFormData, setModalFormData] = useState<Partial<AppFormData>>({});
  
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
    setModalFormData({}); // Clear modal form data on close
    setSuccessMessage("");
    setErrorMessage("");
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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (modalType === "dataDiri") {
      try {
        // Validate required fields
        if (!modalFormData.nama?.trim()) {
          setErrorMessage("Nama tidak boleh kosong");
          return;
        }
        
        if (!modalFormData.nomorTelepon?.trim()) {
          setErrorMessage("Nomor telepon tidak boleh kosong");
          return;
        }
        
        // Prepare the update request based on the API format
        const updateData = {
          name: modalFormData.nama.trim(),
          phone_number: modalFormData.nomorTelepon.trim(),
          birth_place: (modalFormData.tempatLahir || currentData.tempatLahir || "").trim(),
          date_of_birth: modalFormData.tanggalLahir || currentData.tanggalLahir || null,
          address: (modalFormData.alamatRumah || currentData.alamatRumah || "").trim(),
          marital_status_id: mapMaritalStatusToId(modalFormData.statusPernikahan || currentData.statusPernikahan || ""),
          age: parseInt(modalFormData.umur || currentData.umur || "0"),
          blood_group: (modalFormData.golonganDarah || currentData.golonganDarah || "").trim(),
        };

        console.log("Sending update data:", updateData);
        await updateUserMutation.mutateAsync(updateData);
        
        // Update local state
        setCurrentData((prev) => ({ ...prev, ...(modalFormData as AppFormData) }));
        setSuccessMessage("Data diri berhasil diperbarui!");
        
        // Close modal after a short delay
        setTimeout(() => {
          closeModal();
        }, 1500);
      } catch (error) {
        console.error("Failed to update user information:", error);
        
        // Better error message handling
        let errorMsg = "Gagal memperbarui data diri. Silakan coba lagi.";
        
        if (error instanceof Error) {
          if (error.message.includes('Network Error')) {
            errorMsg = "Koneksi ke server terputus. Periksa koneksi internet Anda.";
          } else if (error.message.includes('500')) {
            errorMsg = "Terjadi kesalahan pada server. Silakan coba lagi nanti.";
          } else if (error.message.includes('CORS')) {
            errorMsg = "Terjadi masalah konfigurasi. Silakan restart aplikasi.";
          } else {
            errorMsg = error.message;
          }
        }
        
        setErrorMessage(errorMsg);
      }
    } else {
      // For other modal types, just update local state for now
      setCurrentData((prev) => ({ ...prev, ...(modalFormData as AppFormData) }));
      setSuccessMessage("Data berhasil diperbarui!");
      
      // Close modal after a short delay
      setTimeout(() => {
        closeModal();
      }, 1500);
    }
  };

  const renderModalContent = () => {
    const isLoading = updateUserMutation.isPending;
    
    return (
      <div>
        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-green-500 mr-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-green-800 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-red-500 mr-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-red-800 font-medium">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <LoadingSpinner size="sm" className="mr-3" />
              <p className="text-blue-800 font-medium">Menyimpan perubahan...</p>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
          {(() => {
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
                    {/* ...existing HPHT form content... */}
                  </form>
                );
              default:
                return null;
            }
          })()}
        </div>
      </div>
    );
  };
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

      {/* Loading State */}
      {isLoadingInfo ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <LoadingSpinner size="lg" message="Memuat informasi ibu..." />
          </div>
        </div>
      ) : isError ? (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-red-200">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Gagal Memuat Data
            </h3>
            <p className="text-red-600 mb-4">
              {error?.message || "Terjadi kesalahan saat mengambil data dari server"}
            </p>
            <div className="text-sm text-gray-500 mb-4">
              <p>Kemungkinan penyebab:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Koneksi internet terputus</li>
                <li>Server sedang mengalami gangguan</li>
                <li>Token autentikasi tidak valid</li>
              </ul>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      ) : (
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

        {/* API Integration Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-green-500 mr-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">
                Data berhasil dimuat dari API
              </p>
              <p className="text-xs text-green-600">
                Endpoint: GET /inquiry/information | Update: PUT /inquiry/information/update-users
              </p>
            </div>
          </div>
        </div>

        {/* Update Status Indicator */}
        {updateUserMutation.isSuccess && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-blue-500 mr-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800">
                  Data diri berhasil diperbarui!
                </p>
                <p className="text-xs text-blue-600">
                  Perubahan telah disimpan ke server
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title={getModalTitle()}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default InformasiIbu;
