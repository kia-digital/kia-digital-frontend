import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { DashboardProvider } from "../contexts/DashboardContext";
import { RoleProvider } from "../contexts/RoleContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>

            <div className="flex-1 overflow-y-auto">{children}</div>
          </div>
        </div>
      </DashboardProvider>
    </RoleProvider>
  );
};

export default Layout;
