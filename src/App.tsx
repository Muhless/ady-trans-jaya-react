import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import Spinner from "./components/Spinner";
import { useAuthStore } from "./stores/AuthStore";

function App() {
  return <AppRoutes />;
}

export default App;
