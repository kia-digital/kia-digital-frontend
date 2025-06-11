import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data untuk daftar ibu
const mockIbuData = [
  {
    id: 1,
    nama: "Ibu Hanifah",
    usia: 26,
    usiaKehamilan: "17 minggu 1 hari",
    kondisi: "Sehat",
    lastCheckup: "2025-03-15",
    nextCheckup: "2025-04-09",
    telepon: "0878111525",
    alamat: "Jl. Sutera Narada II, Pakulonan",
  },
  {
    id: 2,
    nama: "Ibu Sari",
    usia: 28,
    usiaKehamilan: "24 minggu 3 hari",
    kondisi: "Sehat",
    lastCheckup: "2025-03-10",
    nextCheckup: "2025-04-15",
    telepon: "0812345678",
    alamat: "Jl. Merdeka No. 123, Jakarta",
  },
  {
    id: 3,
    nama: "Ibu Maria",
    usia: 24,
    usiaKehamilan: "32 minggu 5 hari",
    kondisi: "Perlu Perhatian",
    lastCheckup: "2025-03-08",
    nextCheckup: "2025-04-05",
    telepon: "0823456789",
    alamat: "Jl. Sudirman No. 456, Bandung",
  },
  {
    id: 4,
    nama: "Ibu Rina",
    usia: 30,
    usiaKehamilan: "12 minggu 2 hari",
    kondisi: "Sehat",
    lastCheckup: "2025-03-12",
    nextCheckup: "2025-04-20",
    telepon: "0834567890",
    alamat: "Jl. Pahlawan No. 789, Surabaya",
  },
  {
    id: 5,
    nama: "Ibu Linda",
    usia: 27,
    usiaKehamilan: "38 minggu 1 hari",
    kondisi: "Sehat",
    lastCheckup: "2025-03-18",
    nextCheckup: "2025-04-01",
    telepon: "0845678901",
    alamat: "Jl. Diponegoro No. 321, Yogyakarta",
  },
];

const DashboardPetugas: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKondisi, setFilterKondisi] = useState("semua");

  // Filter data berdasarkan pencarian dan kondisi
  const filteredData = mockIbuData.filter((ibu) => {
    const matchesSearch =
      ibu.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ibu.telepon.includes(searchTerm);
    const matchesFilter =
      filterKondisi === "semua" ||
      ibu.kondisi.toLowerCase() === filterKondisi.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getKondisiBadge = (kondisi: string) => {
    switch (kondisi.toLowerCase()) {
      case "sehat":
        return "bg-green-100 text-green-800 border border-green-300";
      case "perlu perhatian":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "berisiko":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };
  const handleViewDetail = (ibuId: number) => {
    // Navigate ke detail pemeriksaan ibu
    navigate(`/pemeriksaan/detail/${ibuId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Dashboard Petugas Kesehatan
            </h1>
            <p className="text-gray-600">
              Kelola dan pantau kondisi kesehatan ibu hamil
            </p>
          </div>{" "}
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {mockIbuData.length}
                  </h3>
                  <p className="text-gray-600 text-sm">Total Ibu</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-green-600">
                    {
                      mockIbuData.filter((ibu) => ibu.kondisi === "Sehat")
                        .length
                    }
                  </h3>
                  <p className="text-gray-600 text-sm">Kondisi Sehat</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-yellow-600">
                    {
                      mockIbuData.filter(
                        (ibu) => ibu.kondisi === "Perlu Perhatian"
                      ).length
                    }
                  </h3>
                  <p className="text-gray-600 text-sm">Perlu Perhatian</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-pink-100 rounded-lg">
                  <span className="text-2xl">📅</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-pink-600">
                    {
                      mockIbuData.filter((ibu) => {
                        const nextDate = new Date(ibu.nextCheckup);
                        const today = new Date();
                        const diffTime = nextDate.getTime() - today.getTime();
                        const diffDays = Math.ceil(
                          diffTime / (1000 * 60 * 60 * 24)
                        );
                        return diffDays <= 7;
                      }).length
                    }
                  </h3>
                  <p className="text-gray-600 text-sm">Checkup Minggu Ini</p>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* Search and Filter */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cari Ibu
                </label>
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama atau nomor telepon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter Kondisi
                </label>
                <select
                  value={filterKondisi}
                  onChange={(e) => setFilterKondisi(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="semua">Semua Kondisi</option>
                  <option value="sehat">Sehat</option>
                  <option value="perlu perhatian">Perlu Perhatian</option>
                  <option value="berisiko">Berisiko</option>
                </select>
              </div>
            </div>
          </div>
          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Nama Ibu
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Usia
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Usia Kehamilan
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Kondisi
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Checkup Terakhir
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Checkup Selanjutnya
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((ibu) => (
                    <tr
                      key={ibu.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-gray-800">
                            {ibu.nama}
                          </div>
                          <div className="text-sm text-gray-500">
                            {ibu.telepon}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-700">{ibu.usia} tahun</td>
                      <td className="p-4 text-gray-700">{ibu.usiaKehamilan}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getKondisiBadge(
                            ibu.kondisi
                          )}`}
                        >
                          {ibu.kondisi}
                        </span>
                      </td>
                      <td className="p-4 text-gray-700">
                        {new Date(ibu.lastCheckup).toLocaleDateString("id-ID")}
                      </td>
                      <td className="p-4 text-gray-700">
                        {new Date(ibu.nextCheckup).toLocaleDateString("id-ID")}
                      </td>{" "}
                      <td className="p-4">
                        <button
                          onClick={() => handleViewDetail(ibu.id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors font-medium"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Tidak ada data ditemukan
                </h3>
                <p className="text-gray-500">
                  Coba ubah kata kunci pencarian atau filter yang digunakan
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPetugas;
