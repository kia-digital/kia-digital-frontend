import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import type { MonitoringData } from "../services/MonitoringService";
import { useRole } from "../contexts/RoleContext";
import { useAddWeeklyMonitoring } from "../hooks/useMonitoring";

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
  const { currentUser } = useRole();
  const isMotherRole = currentUser.role === "ibu";
  const addMonitoringMutation = useAddWeeklyMonitoring();
  const [selectedWeek, setSelectedWeek] = useState<string>("23");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      id: "fever",
      name: "Demam lebih dari 2 hari",
      icon: "🌡️",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      id: "headache",
      name: "Pusing/Sakit Kepala Berat",
      icon: "😵",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: "insomnia_or_anxiety",
      name: "Sulit Tidur/Cemas Berlebih",
      icon: "😴",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "tb_risk",
      name: "Risiko Batuk > 2 Minggu atau Kontak Serumah dengan Penderita TB",
      icon: "🤧",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "fetal_movement",
      name: "Gerakan Bayi Tidak Ada atau < 10x dalam 12 Jam Setelah Minggu 24",
      icon: "👶",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "abdominal_pain",
      name: "Nyeri Perut Hebat",
      icon: "🤰",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      id: "discharge",
      name: "Keluar Cairan dari Jalan Lahir Sangat Banyak atau Berbau",
      icon: "💧",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      id: "urination_issues",
      name: "Sakit Saat Kencing atau Keluar Keputihan atau Gatal di Area Kemaluan",
      icon: "🚿",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      id: "diarrhea",
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
  const handleSave = async (): Promise<void> => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      // Prepare data for API
      const monitoringData: MonitoringData = {
        weekly_pregnantcy: parseInt(selectedWeek),
        fever: selectedSymptoms.includes("fever"),
        headache: selectedSymptoms.includes("headache"),
        insomnia_or_anxiety: selectedSymptoms.includes("insomnia_or_anxiety"),
        tb_risk: selectedSymptoms.includes("tb_risk"),
        fetal_movement: selectedSymptoms.includes("fetal_movement"),
        abdominal_pain: selectedSymptoms.includes("abdominal_pain"),
        discharge: selectedSymptoms.includes("discharge"),
        urination_issues: selectedSymptoms.includes("urination_issues"),
        diarrhea: selectedSymptoms.includes("diarrhea"),
        type_inquiry: 1, // Fixed value as per API requirement
      };

      console.log("Sending monitoring data:", monitoringData); // Send data to API using mutation hook
      await addMonitoringMutation.mutateAsync(monitoringData);

      // Close modal after successful submission
      onClose(); // Reset form data
      setSelectedWeek("23");
      setSelectedServices([]);
      setSelectedSymptoms([]);
    } catch (error) {
      console.error("Failed to save monitoring data:", error);
      // Error handling is done in the service with toast notifications
    } finally {
      setIsLoading(false);
    }
  };
  if (!isOpen) return null;

  // If not mother role, show access denied message
  if (!isMotherRole && isOpen) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚫</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Akses Terbatas
            </h3>
            <p className="text-gray-600 mb-6">
              Lembar pemantauan hanya dapat diakses oleh ibu hamil untuk
              mencatat kondisi kesehatan mingguan.
            </p>
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-5xl h-[95vh] sm:h-auto sm:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 px-4 sm:px-8 py-4 sm:py-6 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-6 right-3 sm:right-6 w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-600 hover:bg-opacity-100 hover:text-gray-800 transition-all"
          >
            <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 sm:gap-4 text-white pr-12 sm:pr-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-xl sm:text-2xl">📋</span>
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold">
                Lembar Pemantauan
              </h2>
              <p className="text-primary-100 mt-1 text-sm sm:text-base">
                Pantau kondisi kesehatan Ibu secara berkala
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 min-h-0">
          <div className="px-4 sm:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
            {/* Warning Banner */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">⚠️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-orange-800 mb-2">
                    Penting untuk Diperhatikan
                  </h3>{" "}
                  <p className="text-orange-700 text-sm leading-relaxed">
                    Pilih minggu kehamilan dan kondisi yang dialami saat ini.
                    Data akan disimpan dengan tanggal hari ini secara otomatis.
                    Jika mengalami kondisi di bawah ini, segera periksa ke
                    Puskesmas/Rumah Sakit.
                  </p>
                </div>{" "}
              </div>
            </div>
            {/* Minggu Kehamilan */}{" "}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🗓️</span>
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
        <div className="px-4 sm:px-8 py-4 sm:py-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 sm:justify-end">
            {" "}
            <button
              onClick={onClose}
              disabled={isLoading}
              className={`w-full sm:w-auto px-6 py-3 min-h-[44px] text-gray-600 bg-white border border-gray-300 rounded-xl font-medium transition-colors text-center order-2 sm:order-1 ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              Batalkan
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className={`w-full sm:w-auto px-6 py-3 min-h-[44px] text-white bg-primary-500 rounded-xl font-medium transition-colors shadow-sm text-center order-1 sm:order-2 ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-primary-600"
              }`}
            >
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LembarPemantauanModal;
