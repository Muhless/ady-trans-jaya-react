import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import DeliveryPages from "../pages/delivery/Index";
import HomePages from "../pages/Home";
import AddDriverPages from "../pages/driver/AddDriver";
import DetailDriverPages from "../pages/driver/DetailDriver";
import DriverPages from "../pages/driver/Index";
import CarPages from "../pages/car/Index";
import FinancePages from "../pages/finance/Index";
import CustomerPages from "../pages/customer/Index";
import RentalPages from "../pages/rental/Index";
import DetailDeliveryPages from "../pages/delivery/DetailDelivery";
import Layout from "../components/Template/layouts";
import AddDeliveryPages from "../pages/delivery/AddDelivery";
import MapPages from "../pages/delivery/AddMap";

function AppRoutes() {
  return (
    <BrowserRouter>
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
          <Route path="/rent" element={<RentalPages />} />
          {/* delivery */}
          <Route path="/delivery" element={<DeliveryPages />} />
          <Route path="/delivery/add" element={<AddDeliveryPages />} />
          <Route path="/delivery/add/map" element={<MapPages />} />
          <Route path="/delivery/:id" element={<DetailDeliveryPages />} />
          {/* finance */}
          <Route path="/finance" element={<FinancePages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
