import { HelmetProvider } from "react-helmet-async";
import HomePages from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarPages from "./pages/Car";
import Layout from "./layouts";
import DeliveryPages from "./pages/Services/Delivery";
import RentPages from "./pages/Services/Rent";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><HomePages /></Layout>} />
          <Route path="/service/rent" element={<Layout><RentPages /></Layout>} />
          <Route path="/service/delivery" element={<Layout><DeliveryPages /></Layout>} />
          <Route path="/manage/car" element={<Layout><CarPages /></Layout>} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
