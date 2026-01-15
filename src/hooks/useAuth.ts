import { useContext } from "react";
import { AuthContext } from "@/contexts/Auth";
import type { AuthContextType } from "@/contexts/Auth";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};