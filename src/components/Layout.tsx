import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { DashboardProvider } from "../contexts/DashboardContext";
import { RoleProvider } from "../contexts/RoleContext";
import { useLogout } from "../hooks/useLogout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout, isLoggingOut } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <RoleProvider>
      <DashboardProvider>
        <div className="h-screen bg-gray-200 flex">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Mobile Sidebar Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div
                className="fixed inset-0 bg-transparent"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <div className="fixed inset-y-0 left-0 w-64 z-50">
                <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
              </div>
            </div>
          )}

          <div className="flex-1 font-poppins bg-gray-100 flex flex-col overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="text-lg font-semibold text-gradient">
                KIA Digital
              </h1>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="p-2 rounded-md text-gray-600 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                title={isLoggingOut ? "Keluar..." : "Keluar"}
              >
                {isLoggingOut ? (
                  <svg
                    className="w-6 h-6 animate-spin"
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
                    className="w-6 h-6"
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
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">{children}</div>
          </div>
        </div>
      </DashboardProvider>
    </RoleProvider>
  );
};

export default Layout;
