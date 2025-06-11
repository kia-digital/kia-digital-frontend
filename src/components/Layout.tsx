import React from "react";
import Sidebar from "./Sidebar";
import RoleSwitcher from "./RoleSwitcher";
import { DashboardProvider } from "../contexts/DashboardContext";
import { RoleProvider } from "../contexts/RoleContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <RoleProvider>
      <DashboardProvider>
        <div className="h-screen bg-gray-200 flex">
          <Sidebar />
          <div className="flex-1 font-poppins bg-gray-100 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">{children}</div>
          </div>
          {/* Development Role Switcher */}
          <RoleSwitcher />
        </div>
      </DashboardProvider>
    </RoleProvider>
  );
};

export default Layout;
