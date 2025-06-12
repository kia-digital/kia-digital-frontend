import React from "react";
import { useRole } from "../contexts/RoleContext";
import type { UserRole } from "../contexts/RoleContext";

interface RoleSwitcherProps {
  className?: string;
}

const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ className = "" }) => {
  const { currentUser, switchRole } = useRole();
  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    // No need to reload - role will persist automatically
  };

  return (
    <div
      className={`bg-gray-100 rounded-lg border border-gray-200 p-3 ${className}`}
    >
      <div className="text-xs font-medium text-gray-600 mb-2">Dev Mode</div>
      <div className="text-xs text-gray-500 mb-2">
        <span className="font-medium text-gray-700">{currentUser.name}</span>
      </div>

      <div className="space-y-1">
        <button
          onClick={() => handleRoleChange("ibu")}
          className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${
            currentUser.role === "ibu"
              ? "bg-pink-100 text-pink-800 font-medium"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          👩 Ibu
        </button>

        <button
          onClick={() => handleRoleChange("petugas_kesehatan")}
          className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${
            currentUser.role === "petugas_kesehatan"
              ? "bg-blue-100 text-blue-800 font-medium"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          👩‍⚕️ Petugas
        </button>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-200">
        <div className="text-xs text-gray-400">Dev Only</div>
      </div>
    </div>
  );
};

export default RoleSwitcher;
