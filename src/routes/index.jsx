import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts";
import DeliveryPages from "../pages/delivery/Delivery";
import RentPages from "../pages/Rent";
import HomePages from "../pages/Home";
import AddDriverPages from "../pages/driver/AddDriver";
import DetailDriverPages from "../pages/driver/DetailDriver";
import DriverPages from "../pages/driver/Index";
import CarPages from "../pages/car/Index";
import FinancePages from "../pages/finance/Index";
import CustomerPages from "../pages/customer/Index";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePages />} />
          {/* car */}
          <Route path="/car" element={<CarPages />} />
          {/* driver */}
          <Route path="/driver" element={<DriverPages />} />
          <Route path="/driver/add" element={<AddDriverPages />} />
          <Route path="/driver/:id" element={<DetailDriverPages />} />
          {/* customer */}
          <Route path="/customer" element={<CustomerPages />} />
          {/* rental */}
          <Route path="/rent" element={<RentPages />} />
          {/* delivery */}
          <Route path="/delivery" element={<DeliveryPages />} />
          {/* finance */}
          <Route path="/finance" element={<FinancePages />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
