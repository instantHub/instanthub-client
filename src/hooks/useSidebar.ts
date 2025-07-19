import { createContext, useContext } from "react";
import { SidebarContextType } from "@types";

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
