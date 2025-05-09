import { HelmetProvider } from "react-helmet-async";
import AppRoutes from "./routes";
import React from "react";
import { AuthProvider } from "../utils/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
