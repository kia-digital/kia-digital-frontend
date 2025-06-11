import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { DashboardContext } from "../contexts/DashboardContext";
import { useRole } from "../contexts/RoleContext";

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
  const { currentUser } = useRole();
  const navigate = useNavigate();
  const location = useLocation();

  if (!context) {
    return null;
  }
  const { activeTab, setActiveTab } = context;
  // Menu items berdasarkan role
  const getMenuItems = () => {
    const baseItems = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: dashboardIcon,
        activeIcon: dashboardActiveIcon,
        route: "/dashboard",
      },
    ];

    // Menu khusus untuk role Ibu
    if (currentUser.role === "ibu") {
      return [
        ...baseItems,
        {
          id: "pemeriksaan",
          label: "Pemeriksaan",
          icon: pemeriksaanIcon,
          activeIcon: pemeriksaanActiveIcon,
          route: "/pemeriksaan",
        },
        {
          id: "calendar",
          label: "Kalender",
          icon: calendarIcon,
          activeIcon: calendarActiveIcon,
          route: "/calendar",
        },
        {
          id: "edukasi",
          label: "Edukasi",
          icon: edukasiIcon,
          activeIcon: edukasiActiveIcon,
          route: "/edukasi",
        },
      ];
    }

    // Menu untuk Petugas Kesehatan (hanya Dashboard)
    return [baseItems[0]]; // Hanya Dashboard
  };

  const menuItems = getMenuItems();

  const handleMenuClick = (item: (typeof menuItems)[0]) => {
    setActiveTab(item.id);
    navigate(item.route);
  };

  // Sync activeTab with current URL on component mount and route changes
  useEffect(() => {
    const currentPath = location.pathname;
    const currentMenuItem = menuItems.find(
      (item) => item.route === currentPath
    );
    if (currentMenuItem && activeTab !== currentMenuItem.id) {
      setActiveTab(currentMenuItem.id);
    }
  }, [location.pathname, activeTab, setActiveTab, menuItems]);

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

      {/* Role Indicator */}
      <div className="px-6 pb-4">
        <div className="text-xs text-gray-500 mb-1">Login sebagai:</div>
        <div
          className={`text-sm font-medium ${
            currentUser.role === "ibu" ? "text-pink-600" : "text-blue-600"
          }`}
        >
          {currentUser.role === "ibu" ? "👩 " : "👩‍⚕️ "}
          {currentUser.name}
        </div>
      </div>

      {/* Navigation */}
      <nav className="pl-2 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <div key={item.id} className="relative">
              <button
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-pink-600"
                    : "text-gray-500 hover:bg-pink-50 hover:text-pink-600"
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
      </nav>

      {/* Bottom section for additional content if needed */}
      <div className="mt-auto p-4">
        {/* You can add user profile or other content here */}
      </div>
    </div>
  );
}

export default Sidebar;
