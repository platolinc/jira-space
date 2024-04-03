import { ReactNode } from "react";
import { AuthProvider } from "context/auth-context";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { BrowserRouter as Router } from "react-router-dom";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};
