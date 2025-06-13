import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import InformasiIbu from "./subpages/InformasiIbu";
import PemeriksaanANC from "./subpages/PemeriksaanANC";
// import PemeriksaanLeopold from "./subpages/PemeriksaanLeopold"; // Sementara disembunyikan
import PageHeader from "../../components/PageHeader";
import { useRole } from "../../contexts/RoleContext";

type PemeriksaanTabs = "InformasiIbu" | "PemeriksaanANC" | "PemeriksaanLeopold";

const Pemeriksaan: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useRole();

  // Get initial tab from URL params, location state, or default
  const getInitialTab = (): PemeriksaanTabs => {
    // Priority 1: Check location state (from DetailPemeriksaanIbu navigation)
    if (location.state?.activeTab) {
      const requestedTab = location.state.activeTab as PemeriksaanTabs;
      // Redirect Leopold to InformasiIbu (sementara disembunyikan)
      if (requestedTab === "PemeriksaanLeopold") {
        return "InformasiIbu";
      }
      return requestedTab;
    }
    // Priority 2: Check URL parameters (from petugas navigation)
    const type = searchParams.get("type");
    if (type === "anc") return "PemeriksaanANC";
    // Leopold sementara diarahkan ke InformasiIbu
    if (type === "leopold") return "InformasiIbu";
    // Default
    return "InformasiIbu";
  };
  const [activeTab, setActiveTab] = useState<PemeriksaanTabs>(getInitialTab());
  const ibuId = searchParams.get("ibuId");

  // Update activeTab when location state changes
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab as PemeriksaanTabs);
    }
  }, [location.state]);

  // Mock data untuk ibu yang dipilih petugas
  const selectedIbu = ibuId
    ? {
        id: parseInt(ibuId),
        nama: "Ibu Hanifah",
        usia: 26,
        usiaKehamilan: "17 minggu 1 hari",
      }
    : null;

  const renderMainContent = () => {
    switch (activeTab) {
      case "InformasiIbu":
        return <InformasiIbu />;
      case "PemeriksaanANC":
        return <PemeriksaanANC />;
      case "PemeriksaanLeopold":
        // return <PemeriksaanLeopold />; // Sementara disembunyikan
        return <InformasiIbu />; // Redirect ke InformasiIbu
      default:
        return null;
    }
  };

  const tabs: { key: PemeriksaanTabs; label: string }[] = [
    { key: "InformasiIbu", label: "Informasi Ibu" },
    { key: "PemeriksaanANC", label: "Pemeriksaan ANC" },
    // { key: "PemeriksaanLeopold", label: "Pemeriksaan Leopold" }, // Sementara disembunyikan
  ];
  return (
    <>
      {/* Header untuk Petugas Kesehatan */}
      {currentUser.role === "petugas_kesehatan" && selectedIbu && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center text-blue-600 hover:text-blue-800 self-start"
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
                <span className="text-sm sm:text-base">
                  Kembali ke Dashboard
                </span>
              </button>
              <div className="hidden sm:block h-6 w-px bg-blue-300"></div>
              <div>
                <h3 className="font-semibold text-blue-800 text-sm sm:text-base">
                  Pemeriksaan untuk: {selectedIbu.nama}
                </h3>
                <p className="text-xs sm:text-sm text-blue-600">
                  {selectedIbu.usia} tahun • {selectedIbu.usiaKehamilan}
                </p>
              </div>
            </div>
            <div className="text-xs text-blue-600 bg-blue-100 px-2 sm:px-3 py-1 rounded-full self-start sm:self-center">
              Petugas: {currentUser.name}
            </div>
          </div>
        </div>
      )}
      <PageHeader
        title="Pemeriksaan"
        subtitle={
          currentUser.role === "petugas_kesehatan" && selectedIbu
            ? `Melakukan pemeriksaan untuk ${selectedIbu.nama}`
            : "Selamat datang di halaman Pemeriksaan ibu!"
        }
        showLembarPemantauan={currentUser.role === "ibu"}
        showUserAvatar={true}
      />{" "}
      {/* Tabs */}
      <div className="px-4 sm:px-6 bg-gray-100">
        <nav className="flex space-x-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 sm:px-4 py-2 rounded-t-lg font-medium text-xs sm:text-sm focus:outline-none whitespace-nowrap flex-shrink-0 ${
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
      {/* Main Content with proper scroll container */}
      <div className="bg-gray-100 min-h-screen">{renderMainContent()}</div>
    </>
  );
};

export default Pemeriksaan;
