import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "../services/AuthService";

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
  const navigate = useNavigate();
  const location = useLocation();

  if (!context) {
    return null;
  }
<<<<<<< HEAD
  const handleLogout = () => {
    AuthService.logout();
    navigate("/auth");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Determine active tab based on current route
  const getActiveTab = () => {
    const pathname = location.pathname;
    if (pathname === "/dashboard") return "dashboard";
    if (pathname === "/pemeriksaan") return "pemeriksaan";
    if (pathname.includes("calendar")) return "calendar";
    if (pathname.includes("edukasi")) return "edukasi";
    return "dashboard";
  };

  const activeTab = getActiveTab();

=======
  const { activeTab, setActiveTab } = context;
>>>>>>> dashboard-page
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: dashboardIcon,
      activeIcon: dashboardActiveIcon,
<<<<<<< HEAD
      path: "/dashboard",
=======
>>>>>>> dashboard-page
    },
    {
      id: "calendar",
      label: "Kalender",
      icon: calendarIcon,
      activeIcon: calendarActiveIcon,
<<<<<<< HEAD
      path: "/calendar",
=======
>>>>>>> dashboard-page
    },
    {
      id: "pemeriksaan",
      label: "Pemeriksaan",
      icon: pemeriksaanIcon,
      activeIcon: pemeriksaanActiveIcon,
<<<<<<< HEAD
      path: "/pemeriksaan",
=======
>>>>>>> dashboard-page
    },
    {
      id: "edukasi",
      label: "Edukasi",
      icon: edukasiIcon,
      activeIcon: edukasiActiveIcon,
<<<<<<< HEAD
      path: "/edukasi",
=======
>>>>>>> dashboard-page
    },
  ];

  return (
    <div className="w-64 bg-gray-50 min-h-screen shadow-lg">
      {/* Logo Section */}
      <div className="p-6 pb-8">
        <div className="flex items-center space-x-3">
          <img src={strollerIcon} alt="Stroller Icon" className="w-10 h-10" />
          <h1 className="font-bold text-lg text-gradient leading-tight">
            <span className="block">Kesehatan</span>
            <span className="block">Ibu dan Anak</span>
          </h1>
        </div>
      </div>
<<<<<<< HEAD
=======

>>>>>>> dashboard-page
      {/* Navigation */}
      <nav className="pl-2 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <div key={item.id} className="relative">
              <button
<<<<<<< HEAD
                onClick={() => handleNavigation(item.path)}
=======
                onClick={() => setActiveTab(item.id)}
>>>>>>> dashboard-page
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-pink-600" // State aktif: Latar + Teks Pink
                    : "text-gray-500 hover:bg-pink-50 hover:text-pink-600" // State non-aktif + Efek Hover
                }`}
              >
                <img
                  src={isActive ? item.activeIcon : item.icon}
                  alt={`${item.label} Icon`}
                  className="w-5 h-5"
                />
                <span
                  className={`font-medium ${
                    isActive ? "text-gradient" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </span>
              </button>
              {/* Active indicator line */}
              {isActive && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary-500 rounded-l-full"></div>
              )}
            </div>
          );
        })}
<<<<<<< HEAD
      </nav>{" "}
      {/* Bottom section for logout button */}
      <div className="mt-auto p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="font-medium">Logout</span>
        </button>
=======
      </nav>

      {/* Bottom section for additional content if needed */}
      <div className="mt-auto p-4">
        {/* You can add user profile or other content here */}
>>>>>>> dashboard-page
      </div>
    </div>
  );
}

export default Sidebar;
