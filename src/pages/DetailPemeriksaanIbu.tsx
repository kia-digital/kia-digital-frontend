import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRole } from "../contexts/RoleContext";
import PemeriksaanANC from "./Pemeriksaan/subpages/PemeriksaanANC";
import PemeriksaanLeopold from "./Pemeriksaan/subpages/PemeriksaanLeopold";

type PemeriksaanMode = "detail" | "anc" | "leopold";

const mockIbuData = {
  1: {
    id: 1,
    nama: "Ibu Hanifah",
    usia: 26,
    usiaKehamilan: "17 minggu 1 hari",
    kondisi: "Sehat",
    lastCheckup: "2025-03-15",
    nextCheckup: "2025-04-09",
    telepon: "0878111525",
    alamat: "Jl. Sutera Narada II, Pakulonan",
    golonganDarah: "A",
    tinggiBadan: "168 cm",
    beratBadan: "65 kg",
    riwayatPenyakit: "Tidak Ada",
    riwayatAlergi: "Tidak Ada",
    suami: "Bapak Ahmad",
    pekerjaanSuami: "Karyawan Swasta",
  },
};

const DetailPemeriksaanIbu: React.FC = () => {
  const { ibuId } = useParams<{ ibuId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useRole();
  const [activeMode, setActiveMode] = useState<PemeriksaanMode>("detail");
  // Reset activeMode ke "detail" ketika role berubah ke "ibu"
  useEffect(() => {
    if (currentUser.role === "ibu") {
      setActiveMode("detail");
    }
  }, [currentUser.role]);

  // Juga pastikan activeMode selalu "detail" untuk role ibu saat component render
  const effectiveActiveMode =
    currentUser.role === "ibu" ? "detail" : activeMode;

  const ibu = mockIbuData[parseInt(ibuId || "1") as keyof typeof mockIbuData];

  if (!ibu) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Data Tidak Ditemukan
          </h2>{" "}
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }
  const handlePemeriksaan = (jenis: "anc" | "leopold") => {
    setActiveMode(jenis);
  };

  const handleBackToDetail = () => {
    setActiveMode("detail");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Kembali ke Dashboard
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Detail Pemeriksaan
            </h1>
            <p className="text-gray-600">{ibu.nama}</p>{" "}
          </div>

          {/* Tombol Pemeriksaan - Hanya untuk Petugas Kesehatan */}
          {currentUser.role === "petugas_kesehatan" && (
            <div className="flex flex-col sm:flex-row gap-3">
              {" "}
              <button
                onClick={() => handlePemeriksaan("anc")}
                className={`w-full sm:w-auto px-4 py-3 sm:py-2 rounded-lg transition-all duration-200 flex items-center justify-center sm:justify-start space-x-2 min-h-[44px] ${
                  effectiveActiveMode === "anc"
                    ? "bg-primary-600 text-white shadow-lg scale-105"
                    : "bg-primary-500 text-white hover:bg-primary-600 hover:shadow-md"
                }`}
              >
                {effectiveActiveMode === "anc" && (
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                )}
                <span>Pemeriksaan ANC</span>
              </button>
              <button
                onClick={() => handlePemeriksaan("leopold")}
                className={`w-full sm:w-auto px-4 py-3 sm:py-2 rounded-lg transition-all duration-200 flex items-center justify-center sm:justify-start space-x-2 min-h-[44px] ${
                  effectiveActiveMode === "leopold"
                    ? "bg-purple-600 text-white shadow-lg scale-105"
                    : "bg-purple-500 text-white hover:bg-purple-600 hover:shadow-md"
                }`}
              >
                {effectiveActiveMode === "leopold" && (
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                )}
                <span>Pemeriksaan Leopold</span>
              </button>
              {effectiveActiveMode !== "detail" && (
                <button
                  onClick={handleBackToDetail}
                  className="w-full sm:w-auto bg-gray-500 text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-gray-600 transition-colors min-h-[44px]"
                >
                  Kembali ke Detail
                </button>
              )}
            </div>
          )}
        </div>{" "}
        {/* Detail Cards - Hanya tampil pada mode detail */}
        {effectiveActiveMode === "detail" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Data Pribadi */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-6 bg-pink-500 rounded mr-3"></span>
                Data Pribadi
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Nama Lengkap</label>
                  <p className="font-medium text-gray-800">{ibu.nama}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Usia</label>
                  <p className="font-medium text-gray-800">{ibu.usia} tahun</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Nomor Telepon</label>
                  <p className="font-medium text-gray-800">{ibu.telepon}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Alamat</label>
                  <p className="font-medium text-gray-800">{ibu.alamat}</p>
                </div>
              </div>
            </div>
            {/* Data Medis */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              {" "}
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-6 bg-primary-500 rounded mr-3"></span>
                Data Medis
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">
                    Usia Kehamilan
                  </label>
                  <p className="font-medium text-gray-800">
                    {ibu.usiaKehamilan}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Kondisi</label>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      ibu.kondisi === "Sehat"
                        ? "bg-green-100 text-green-800"
                        : ibu.kondisi === "Perlu Perhatian"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {ibu.kondisi}
                  </span>
                </div>
                <div>
                  <label className="text-sm text-gray-500">
                    Golongan Darah
                  </label>
                  <p className="font-medium text-gray-800">
                    {ibu.golonganDarah}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">
                    Tinggi/Berat Badan
                  </label>
                  <p className="font-medium text-gray-800">
                    {ibu.tinggiBadan} / {ibu.beratBadan}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">
                    Riwayat Penyakit
                  </label>
                  <p className="font-medium text-gray-800">
                    {ibu.riwayatPenyakit}
                  </p>
                </div>
              </div>
            </div>{" "}
            {/* Jadwal Pemeriksaan */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-6 bg-green-500 rounded mr-3"></span>
                Jadwal Pemeriksaan
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <label className="text-sm text-gray-500">
                    Pemeriksaan Terakhir
                  </label>
                  <p className="font-medium text-gray-800">
                    {new Date(ibu.lastCheckup).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>{" "}
                <div className="p-3 bg-primary-50 rounded-lg border border-primary-200">
                  <label className="text-sm text-primary-600">
                    Pemeriksaan Selanjutnya
                  </label>
                  <p className="font-medium text-primary-800">
                    {new Date(ibu.nextCheckup).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>{" "}
            </div>
          </div>
        )}{" "}
        {/* Riwayat Pemeriksaan - Hanya tampil pada mode detail */}
        {effectiveActiveMode === "detail" && (
          <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Riwayat Pemeriksaan
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">
                      Tanggal
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">
                      Jenis Pemeriksaan
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">
                      Hasil
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">
                      Petugas
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 text-sm text-gray-700">15 Maret 2025</td>
                    <td className="p-3 text-sm text-gray-700">ANC</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Normal
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      Dr. Sarah Putri
                    </td>{" "}
                    <td className="p-3">
                      <button className="text-primary-500 hover:text-primary-700 text-sm">
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-sm text-gray-700">1 Maret 2025</td>
                    <td className="p-3 text-sm text-gray-700">Leopold</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Normal
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      Dr. Sarah Putri
                    </td>{" "}
                    <td className="p-3">
                      <button className="text-primary-500 hover:text-primary-700 text-sm">
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                </tbody>{" "}
              </table>
            </div>
          </div>
        )}{" "}
        {/* Konten Pemeriksaan - Hanya untuk Petugas Kesehatan */}
        {currentUser.role === "petugas_kesehatan" &&
          effectiveActiveMode !== "detail" &&
          effectiveActiveMode === "anc" && (
            <div className="mt-6">
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  {" "}
                  <div>
                    <h2 className="text-xl font-semibold text-primary-600">
                      Pemeriksaan ANC
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {ibu.nama} • {ibu.usiaKehamilan} •{" "}
                      {new Date().toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Petugas: Dr. Sarah Putri
                  </div>
                </div>
              </div>
              <PemeriksaanANC />
            </div>
          )}
        {currentUser.role === "petugas_kesehatan" &&
          effectiveActiveMode !== "detail" &&
          effectiveActiveMode === "leopold" && (
            <div className="mt-6">
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-purple-600">
                      Pemeriksaan Leopold
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {ibu.nama} • {ibu.usiaKehamilan} •{" "}
                      {new Date().toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Petugas: Dr. Sarah Putri
                  </div>
                </div>
              </div>
              <PemeriksaanLeopold />
            </div>
          )}
      </div>
    </div>
  );
};

export default DetailPemeriksaanIbu;
