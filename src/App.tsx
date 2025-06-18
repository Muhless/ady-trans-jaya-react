import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./stores/AuthStore";
import { Toaster } from "sonner";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Toaster richColors position="top-center" />
      <AppRoutes />
    </>
  );
}

export default App;
