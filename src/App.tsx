import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./stores/AuthStore";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
}

export default App;
