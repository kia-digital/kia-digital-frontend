import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface DashboardContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <DashboardContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </DashboardContext.Provider>
  );
};
