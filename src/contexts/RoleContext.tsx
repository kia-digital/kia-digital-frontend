import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type UserRole = "ibu" | "petugas_kesehatan";

interface User {
  id: string;
  name: string;
  role: UserRole;
}

interface RoleContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Default users for development
const defaultUsers: Record<UserRole, User> = {
  ibu: {
    id: "1",
    name: "Ibu Hanifah",
    role: "ibu",
  },
  petugas_kesehatan: {
    id: "2",
    name: "Dr. Sarah Putri",
    role: "petugas_kesehatan",
  },
};

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  // Get initial role from localStorage or default to 'ibu'
  const getInitialUser = (): User => {
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("currentRole") as UserRole;
      if (savedRole && savedRole in defaultUsers) {
        return defaultUsers[savedRole];
      }
    }
    return defaultUsers.ibu;
  };

  const [currentUser, setCurrentUser] = useState<User>(getInitialUser);

  const switchRole = (role: UserRole) => {
    const newUser = defaultUsers[role];
    setCurrentUser(newUser);
    // Save to localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("currentRole", role);
    }
  };

  return (
    <RoleContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
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
