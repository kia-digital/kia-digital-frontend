import { useContext } from "react";

import { DashboardContext } from "../contexts/DashboardContext";

// Assets
import strollerIcon from "../assets/stroller.svg";
import dashboardIcon from "../assets/dashboard.svg";
import dashboardActiveIcon from "../assets/dashboard_active.svg";
import calendarIcon from "../assets/calendar.svg";
import calendarActiveIcon from "../assets/calendar_active.svg";
import pemeriksaanIcon from "../assets/pemeriksaan.svg";
import pemeriksaanActiveIcon from "../assets/pemeriksaan_active.svg";
import edukasiIcon from "../assets/edukasi.svg";
import edukasiActiveIcon from "../assets/edukasi_active.svg";

function Sidebar() {
  const context = useContext(DashboardContext);
  if (!context) {
    return null;
  }
  const { activeTab, setActiveTab } = context;
  return (
    <>
      <div className="w-64 bg-white shadow-sm">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <img src={strollerIcon} alt="Stroller Icon" className="text-5xl" />
            <div className="leading-tight">
              <span className="font-bold text-lg text-gradient-primary">
                Kesehatan
              </span>
              <br />
              <span className="font-bold text-lg text-gradient-primary">
                Ibu dan Anak
              </span>
            </div>
          </div>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            <li>
              <a
                href="#"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === "dashboard"
                    ? "text-pink-500 bg-pink-50 border-l-4 border-pink-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <img
                  src={
                    activeTab === "dashboard"
                      ? dashboardActiveIcon
                      : dashboardIcon
                  }
                  alt="Dashboard Icon"
                  className="w-6 h-6"
                />
                <span
                  className={
                    activeTab === "dashboard"
                      ? "font-medium text-gradient-primary"
                      : "text-[var(--tertiary-color)]"
                  }
                >
                  Dashboard
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === "calendar"
                    ? "text-pink-500 bg-pink-50 border-l-4 border-pink-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("calendar")}
              >
                <img
                  src={
                    activeTab === "calendar" ? calendarActiveIcon : calendarIcon
                  }
                  alt="Calendar Icon"
                  className="w-6 h-6"
                />
                <span
                  className={
                    activeTab === "calendar"
                      ? "font-medium text-gradient-primary"
                      : "text-[var(--tertiary-color)]"
                  }
                >
                  Calendar
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === "pemeriksaan"
                    ? "text-pink-500 bg-pink-50 border-l-4 border-pink-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("pemeriksaan")}
              >
                <img
                  src={
                    activeTab === "pemeriksaan"
                      ? pemeriksaanActiveIcon
                      : pemeriksaanIcon
                  }
                  alt="Pemeriksaan Icon"
                  className="w-6 h-6"
                />
                <span
                  className={
                    activeTab === "pemeriksaan"
                      ? "font-medium text-gradient-primary"
                      : "text-[var(--tertiary-color)]"
                  }
                >
                  Pemeriksaan
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === "edukasi"
                    ? "text-pink-500 bg-pink-50 border-l-4 border-pink-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("edukasi")}
              >
                <img
                  src={
                    activeTab === "edukasi" ? edukasiActiveIcon : edukasiIcon
                  }
                  alt="Edukasi Icon"
                  className="w-6 h-6"
                />
                <span
                  className={
                    activeTab === "edukasi"
                      ? "font-medium text-gradient-primary"
                      : "text-[var(--tertiary-color)]"
                  }
                >
                  Edukasi
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
