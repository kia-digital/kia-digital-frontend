import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { DashboardContext } from "../contexts/DashboardContext";
import { useRole } from "../contexts/RoleContext";
import RoleSwitcher from "./RoleSwitcher";
import { useLogout } from "../hooks/useLogout";

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

interface SidebarProps {
  onClose?: () => void;
}

function Sidebar({ onClose }: SidebarProps) {
  const context = useContext(DashboardContext);
  const { currentUser } = useRole();
  const { logout, isLoggingOut } = useLogout();
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
    // Close mobile menu when item is clicked
    if (onClose) {
      onClose();
    }
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

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div
      className={`w-64 min-h-screen shadow-lg relative ${
        onClose ? "bg-gray-50/95 backdrop-blur-sm" : "bg-gray-50"
      }`}
    >
      {/* Mobile Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* Logo Section */}
      <div className="p-6 pb-8">
        <div className="flex items-center space-x-3">
          <img
            src={strollerIcon}
            alt="Stroller Icon"
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
          <h1 className="font-bold text-base sm:text-lg text-gradient leading-tight">
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

      {/* Bottom section with RoleSwitcher and Logout */}
      <div className="mt-auto p-4 space-y-3">
        <RoleSwitcher />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-500 hover:bg-red-50 hover:text-red-600 border border-gray-200 hover:border-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? (
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
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
          )}
          <span className="font-medium">
            {isLoggingOut ? "Keluar..." : "Keluar"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
