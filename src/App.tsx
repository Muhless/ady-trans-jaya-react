import { HelmetProvider } from "react-helmet-async";
import AppRoutes from "./routes";
import React from "react";

function App() {
  return (
    <HelmetProvider>
      <AppRoutes />
    </HelmetProvider>
  );
}

export default App;
