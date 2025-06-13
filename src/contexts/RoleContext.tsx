import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type UserRole = "ibu" | "petugas_kesehatan";
export type ApiRole = "Ibu Hamil" | "Petugas Kesehatan";

interface User {
  id: string;
  name: string;
  role: UserRole;
  roleId?: number;
  isFromApi?: boolean;
}

interface RoleContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  setUserFromApi: (apiRole: ApiRole, roleId: number, name?: string) => void;
  isApiRole: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Default users for development
const defaultUsers: Record<UserRole, User> = {
  ibu: {
    id: "1",
    name: "Ibu Hanifah",
    role: "ibu",
    isFromApi: false,
  },
  petugas_kesehatan: {
    id: "2",
    name: "Dr. Sarah Putri",
    role: "petugas_kesehatan",
    isFromApi: false,
  },
};

// Utility function to convert API role to internal role
const convertApiRoleToUserRole = (apiRole: ApiRole): UserRole => {
  return apiRole === "Ibu Hamil" ? "ibu" : "petugas_kesehatan";
};

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  // Get initial role from API or localStorage
  const getInitialUser = (): User => {
    if (typeof window !== "undefined") {
      // First check if we have API role data
      const apiRole = localStorage.getItem("userRole") as ApiRole;
      const roleId = localStorage.getItem("roleId");

      if (apiRole && roleId) {
        const userRole = convertApiRoleToUserRole(apiRole);
        return {
          id: roleId,
          name: apiRole === "Ibu Hamil" ? "Ibu" : "Petugas Kesehatan",
          role: userRole,
          roleId: parseInt(roleId),
          isFromApi: true,
        };
      }

      // Fallback to development role
      const savedRole = localStorage.getItem("currentRole") as UserRole;
      if (savedRole && savedRole in defaultUsers) {
        return defaultUsers[savedRole];
      }
    }
    return defaultUsers.ibu;
  };

  const [currentUser, setCurrentUser] = useState<User>(getInitialUser);
  // Function to set user from API response
  const setUserFromApi = (apiRole: ApiRole, roleId: number, name?: string) => {
    const userRole = convertApiRoleToUserRole(apiRole);

    const newUser: User = {
      id: roleId.toString(),
      name: name || (apiRole === "Ibu Hamil" ? "Ibu" : "Petugas Kesehatan"),
      role: userRole,
      roleId,
      isFromApi: true,
    };

    setCurrentUser(newUser);

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", apiRole);
      localStorage.setItem("roleId", roleId.toString());
      // Clear development role when using API role
      localStorage.removeItem("currentRole");
    }
  };

  const switchRole = (role: UserRole) => {
    // Only allow switching if not using API role
    if (!currentUser.isFromApi) {
      const newUser = defaultUsers[role];
      setCurrentUser(newUser);
      // Save to localStorage for persistence
      if (typeof window !== "undefined") {
        localStorage.setItem("currentRole", role);
      }
    }
  };

  const isApiRole = currentUser.isFromApi || false;

  return (
    <RoleContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        setUserFromApi,
        isApiRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
