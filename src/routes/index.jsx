import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts";
import DeliveryPages from "../pages/Admin/Services/Delivery";
import RentPages from "../pages/Admin/Rent";
import CarPages from "../pages/Admin/Manages/Car";
import CustomerPages from "../pages/Admin/Manages/Customer";
import HomePages from "../pages/Home";
import AddDriverPages from "../pages/Admin/Driver/AddDriver";
import DetailDriverPages from "../pages/Admin/Driver/DetailDriver";
import DriverPages from "../pages/Admin/Driver/Driver";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePages />} />
          {/* driver */}
          <Route path="/manage/driver" element={<DriverPages />} />
          <Route path="/manage/driver/add" element={<AddDriverPages />} />
          <Route path="/manage/driver/:id" element={<DetailDriverPages />} />
          {/* customer */}
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
