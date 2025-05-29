// src/types.ts (or define within Pemeriksaan.tsx if preferred)
export interface AppFormData {
  // Data Diri
  nama: string;
  nomorTelepon: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamatRumah: string;
  statusPernikahan: string;
  umur: string;
  golonganDarah: string;
  // Data Medis
  riwayatPenyakit?: string;
  riwayatAlergi?: string;
  tinggiBadan: string;
  beratBadan: string;
  statusImunisasi?: string;
  riwayatKehamilan?: string;
  // Kontak Darurat
  namaKontak: string;
  hubunganKontak: string;
  nomorTeleponKontak: string;
  alamatKontak?: string;
}

export type ModalType = "dataDiri" | "dataMedis" | "kontakDarurat" | "";

export interface SelectOption {
  value: string;
  label: string;
}
