import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

// 整个应用的Context
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
