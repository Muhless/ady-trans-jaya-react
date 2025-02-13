import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts";
import DriverPages from "../pages/Admin/Manages/Driver/Driver";
import DeliveryPages from "../pages/Admin/Services/Delivery";
import RentPages from "../pages/Admin/Services/Rent";
import CarPages from "../pages/Admin/Manages/Car";
import CustomerPages from "../pages/Admin/Manages/Customer";
import HomePages from "../pages/Home";
import DetailDriverPages from "../pages/Admin/Manages/Driver/DetailDriver";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePages />} />
          {/* driver */}
          <Route path="/manage/driver" element={<DriverPages />} />
          <Route path="/manage/driver/:id" element={<DetailDriverPages />} />
          <Route path="/manage/customer" element={<CustomerPages />} />
          <Route path="/manage/car" element={<CarPages />} />
          <Route path="/service/rent" element={<RentPages />} />
          <Route path="/service/delivery" element={<DeliveryPages />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
