import "./App.css";
import Navbar from "./components/Navbar";
import LoginScreen from "./pages/auth/Login";
import HomePages from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/auth/login" element={<LoginScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
