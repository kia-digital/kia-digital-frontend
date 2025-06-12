import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

interface LembarPemantauanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ServiceOption {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

interface SymptomOption {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

const LembarPemantauanModal: React.FC<LembarPemantauanModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<string>("23");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const serviceOptions: ServiceOption[] = [
    {
      id: "pemeriksaan",
      name: "Pemeriksaan Kehamilan",
      icon: "🩺",
      bgColor: "bg-primary-100",
      iconColor: "text-primary-600",
    },
    {
      id: "kelas",
      name: "Kelas Ibu Hamil",
      icon: "👩‍🏫",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];
  const symptomOptions: SymptomOption[] = [
    {
      id: "demam",
      name: "Demam lebih dari 2 hari",
      icon: "🌡️",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      id: "pusing",
      name: "Pusing/Sakit Kepala Berat",
      icon: "😵",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: "tidur",
      name: "Sulit Tidur/Cemas Berlebih",
      icon: "😴",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "risiko",
      name: "Risiko Batuk > 2 Minggu atau Kontak Serumah dengan Penderita TB",
      icon: "🤧",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "gerakan",
      name: "Gerakan Bayi Tidak Ada atau < 10x dalam 12 Jam Setelah Minggu 24",
      icon: "👶",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "nyeri",
      name: "Nyeri Perut Hebat",
      icon: "🤰",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      id: "keluar",
      name: "Keluar Cairan dari Jalan Lahir Sangat Banyak atau Berbau",
      icon: "💧",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      id: "sakit",
      name: "Sakit Saat Kencing atau Keluar Keputihan atau Gatal di Area Kemaluan",
      icon: "🚿",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      id: "diare",
      name: "Diare Berulang",
      icon: "🚽",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];
  const weekOptions = Array.from({ length: 28 }, (_, i) => ({
    value: String(13 + i),
    label: `Minggu ke-${13 + i}`,
  }));
  const handleServiceToggle = (serviceId: string): void => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((s) => s !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSymptomToggle = (symptomId: string): void => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((s) => s !== symptomId)
        : [...prev, symptomId]
    );
  };
  const handleSave = (): void => {
    // Here you would typically save the data to your backend
    const data = {
      week: selectedWeek,
      services: selectedServices,
      symptoms: selectedSymptoms,
      timestamp: new Date().toISOString(),
    };

    console.log("Saving monitoring data:", data);

    // Show success message or handle the response
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6">
          {" "}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-600 hover:bg-opacity-100 hover:text-gray-800 transition-all"
          >
            <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-4 text-white">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Lembar Pemantauan</h2>
              <p className="text-primary-100 mt-1">
                Pantau kondisi kesehatan Ibu secara berkala
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="px-8 py-6 space-y-8">
            {/* Warning Banner */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">⚠️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-orange-800 mb-2">
                    Penting untuk Diperhatikan
                  </h3>
                  <p className="text-orange-700 text-sm leading-relaxed">
                    Pilih pilihan di bawah ini setiap periksa ke dokter dan cek
                    kondisi mingguan Ibu. Jika mengalami kondisi di bawah ini,
                    segera periksa ke Puskesmas/Rumah Sakit.
                  </p>
                </div>
              </div>
            </div>{" "}
            {/* Minggu Kehamilan */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📅</span>
                <label className="block text-gray-800 font-semibold text-lg">
                  Minggu Kehamilan
                </label>
              </div>
              <div className="relative max-w-xs">
                <select
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-700 font-medium transition-all"
                >
                  {weekOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="w-4 h-4 text-gray-500"
                  />
                </div>
              </div>
            </div>
            {/* Pelayanan Kesehatan */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏥</span>
                <h3 className="text-gray-800 font-semibold text-lg">
                  Pelayanan Kesehatan
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceOptions.map((service) => (
                  <div
                    key={service.id}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                      selectedServices.includes(service.id)
                        ? "border-primary-300 bg-primary-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                    onClick={() => handleServiceToggle(service.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-6 h-6 border-2 rounded-lg flex items-center justify-center ${
                          selectedServices.includes(service.id)
                            ? "border-primary-500 bg-primary-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedServices.includes(service.id) && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="w-3 h-3 text-white"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className={`w-12 h-12 ${service.bgColor} rounded-xl flex items-center justify-center`}
                        >
                          <span className="text-xl">{service.icon}</span>
                        </div>
                        <span className="text-gray-800 font-medium">
                          {service.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>{" "}
            {/* Pemantauan Mingguan */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🩺</span>
                <h3 className="text-gray-800 font-semibold text-lg">
                  Pemantauan Mingguan
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {symptomOptions.map((symptom) => (
                  <div
                    key={symptom.id}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                      selectedSymptoms.includes(symptom.id)
                        ? "border-primary-300 bg-primary-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                    onClick={() => handleSymptomToggle(symptom.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 border-2 rounded mt-1 flex items-center justify-center flex-shrink-0 ${
                          selectedSymptoms.includes(symptom.id)
                            ? "border-primary-500 bg-primary-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedSymptoms.includes(symptom.id) && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="w-2.5 h-2.5 text-white"
                          />
                        )}
                      </div>
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className={`w-10 h-10 ${symptom.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <span className="text-lg">{symptom.icon}</span>
                        </div>
                        <span className="text-gray-700 font-medium text-sm leading-relaxed">
                          {symptom.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-600 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Batalkan
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 text-white bg-primary-500 rounded-xl font-medium hover:bg-primary-600 transition-colors shadow-sm"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default LembarPemantauanModal;
