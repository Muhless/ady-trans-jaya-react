import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./stores/AuthStore";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return <AppRoutes />;
}

export default App;
