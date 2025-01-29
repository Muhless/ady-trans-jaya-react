import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginScreen from "./pages/auth/Login";
import HomePages from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarPages from "./pages/cars";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/cars" element={<CarPages />} />
          <Route path="/auth/login" element={<LoginScreen />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
