import React, { useState } from "react";
import InformasiIbu from "./subpages/InformasiIbu";
import PemeriksaanANC from "./subpages/PemeriksaanANC";
import PemeriksaanLeopold from "./subpages/PemeriksaanLeopold";
import PageHeader from "../../components/PageHeader";

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
    <>
      <PageHeader
        title="Pemeriksaan"
        subtitle="Selamat datang di halaman Pemeriksaan ibu!"
        showLembarPemantauan={true}
        showUserAvatar={true}
      />

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
    </>
  );
};

export default Pemeriksaan;
