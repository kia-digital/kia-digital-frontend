import React from "react";

interface CheckupData {
  scheduledDate: string;
  location: string;
  officer: string;
  weight: string;
  bloodPressure: string;
  heartRate: string;
  gestationalAge: string;
  bloodSugar: string;
  notes: string;
}

interface ANCCheckupCardProps {
  checkupNumber: number;
  data: CheckupData;
  isCompleted?: boolean;
}

const ANCCheckupCard: React.FC<ANCCheckupCardProps> = ({
  checkupNumber,
  data,
  isCompleted = false,
}) => {
  return (
    <div className="w-full p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-1 h-8 bg-yellow-400 rounded-full mr-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">
            Pemeriksaan ANC ke-{checkupNumber}
          </h2>
        </div>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            isCompleted
              ? "bg-green-100 text-green-700"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {isCompleted ? "Selesai" : "Terlaksana"}
        </button>
      </div>

      {/* Schedule Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Dijadwalkan pada tanggal
          </h3>
          <p className="text-gray-800">{data.scheduledDate || "-"}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Lokasi</h3>
          <p className="text-gray-800">{data.location || "-"}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Petugas</h3>
          <p className="text-gray-800">{data.officer || "-"}</p>
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Results */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Hasil pemeriksaan
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Berat Badan
            </h4>
            <p className="text-gray-800">{data.weight || "-"}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Tekanan Darah (Sistolik / Diastolik)
            </h4>
            <p className="text-gray-800">{data.bloodPressure || "-"}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Tinggi Fundus Uteri (TFU)
            </h4>
            <p className="text-gray-800">{data.heartRate || "-"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Detak Jantung Janin (DJJ)
            </h4>
            <p className="text-gray-800">{data.gestationalAge || "-"}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Gula Darah
            </h4>
            <p className="text-gray-800">{data.bloodSugar || "-"}</p>
          </div>
          <div></div>
        </div>
      </div>

      <hr className="border-gray-200 mb-4" />

      {/* Notes */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Catatan:</h3>
        <p className="text-gray-600">{data.notes || "Belum ada catatan"}</p>
      </div>
    </div>
  );
};

const PemeriksaanANC: React.FC = () => {
  const sampleData: CheckupData = {
    scheduledDate: "15 Januari 2024",
    location: "Puskesmas Kecamatan ABC",
    officer: "dr. Sarah Wijaya",
    weight: "65 kg",
    bloodPressure: "120/80 mmHg",
    heartRate: "28 cm",
    gestationalAge: "140 bpm",
    bloodSugar: "95 mg/dL",
    notes:
      "Kondisi ibu dan janin dalam keadaan sehat. Disarankan untuk tetap menjaga pola makan yang sehat dan rutin berolahraga ringan.",
  };

  return (
    <div className="flex flex-col bg-gray-50 p-7 flex-1 min-h-0 overflow-auto">
      <h1 className="text-2xl font-bold">Pemeriksaan Kehamilan (ANC)</h1>
      <p className="text-sm text-primary-500 mb-4">Antenatal Care</p>

      <p className="mb-4 text-sm">
        Pemeriksaan kehamilan atau Antenatal Care (ANC) adalah serangkaian
        layanan kesehatan yang diberikan kepada Ibu hamil secara rutin.
        Tujuannya adalah untuk memastikan kesehatan ibu dan janin, mendeteksi
        sejak dini risiko kehamilan, dan memberikan edukasi penting sepanjang
        masa kehamilan.
      </p>

      <h2 className="text-xl font-semibold mb-2">
        Apa Saja yang Diperiksa Saat ANC?
      </h2>
      <ol className="list-decimal list-inside text-sm mb-6">
        <li>Temu Wicara</li>
        <li>Timbang berat badan</li>
        <li>Tekanan darah</li>
        <li>Nilai status gizi</li>
        <li>Tinggi fundus uteri</li>
        <li>Tentukan presentasi janin dan denyut</li>
        <li>Tes lab sederhana</li>
        <li>Tablet besi</li>
        <li>Tetanus toksoid</li>
        <li>Tata laksana kasus</li>
      </ol>
      <h2 className="text-xl font-semibold mb-2">Jadwal ANC Anda</h2>
      <ANCCheckupCard checkupNumber={1} data={sampleData} isCompleted={true} />
    </div>
  );
};

export default PemeriksaanANC;
