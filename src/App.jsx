import { HelmetProvider } from "react-helmet-async";
import HomePages from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarPages from "./pages/Map";
import Layout from "./layouts";
import DeliveryPages from "./pages/Admin/Services/Delivery";
import RentPages from "./pages/Admin/Services/Rent";
import DriverPages from "./pages/Admin/Manages/Driver";
import CustomerPages from "./pages/Admin/Manages/Customer";

function App() {
  return (
    <HelmetProvider>
    <Router>
   <Layout>   
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/manage/driver" element={<DriverPages/>}/>
          <Route path="/manage/customer" element={<CustomerPages/>}/>
          <Route path="/manage/car" element={<CarPages/>}/>
          <Route path="/service/rent" element={<RentPages />} />
          <Route path="/service/delivery" element={<DeliveryPages />} />
        </Routes>
      </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
