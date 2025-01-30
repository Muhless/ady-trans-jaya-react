import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import HomePages from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarPages from "./pages/cars";
import Layout from "./layouts";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><HomePages /></Layout>} />
          <Route path="/cars" element={<Layout><CarPages /></Layout>} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
