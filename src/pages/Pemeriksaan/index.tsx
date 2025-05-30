import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import InformasiIbu from "./subpages/InformasiIbu";
import PemeriksaanANC from "./subpages/PemeriksaanANC";
import PemeriksaanLeopold from "./subpages/PemeriksaanLeopold";

interface PlaceholderProps {
  className?: string;
}

const UserCirclePlaceholder: React.FC<PlaceholderProps> = ({
  className = "w-10 h-10",
}) => <div className={`bg-gray-400 rounded-full ${className}`}></div>;

const FileAltPlaceholder: React.FC<PlaceholderProps> = ({
  className = "w-4 h-4 mr-2",
}) => <div className={`bg-white rounded ${className}`}></div>;

type PemeriksaanTabs = "InformasiIbu" | "PemeriksaanANC" | "PemeriksaanLeopold";

const Pemeriksaan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PemeriksaanTabs>("InformasiIbu");

  const renderMainContent = () => {
    switch (activeTab) {
      case "InformasiIbu":
        return <InformasiIbu />;
      case "PemeriksaanANC":
        return <PemeriksaanANC />;
      case "PemeriksaanLeopold":
        return <PemeriksaanLeopold />;
      default:
        return null;
    }
  };

  const tabs: { key: PemeriksaanTabs; label: string }[] = [
    { key: "InformasiIbu", label: "Informasi Ibu" },
    { key: "PemeriksaanANC", label: "Pemeriksaan ANC" },
    { key: "PemeriksaanLeopold", label: "Pemeriksaan Leopold" },
  ];

  return (
    <div className="h-screen bg-gray-200 flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 font-poppins bg-gray-100 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-pink-500">Pemeriksaan</h1>
            <p className="text-gray-500 text-sm">
              Selamat datang di halaman Pemeriksaan ibu!
            </p>
          </div>
          <div className="flex items-center">
            <button className="bg-pink-500 text-white px-3 py-1.5 rounded-lg flex items-center shadow-sm hover:bg-pink-600 text-sm">
              <FileAltPlaceholder className="w-3 h-3 mr-1" />
              Lembar Pemantauan
            </button>
            <UserCirclePlaceholder className="w-8 h-8 ml-3" />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <nav className="flex space-x-1">
            {tabs.map((tab) => {
              const isActive = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-t-lg font-medium text-sm focus:outline-none ${
                    isActive
                      ? "bg-gray-50 text-pink-500"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        {renderMainContent()}
      </div>
    </div>
  );
};

export default Pemeriksaan;
