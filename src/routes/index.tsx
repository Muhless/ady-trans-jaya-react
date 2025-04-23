import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import DeliveryPages from "../features/delivery/Index";
import HomePages from "../pages/Dashboard";
import AddDriverPages from "../features/driver/AddDriver";
import DetailDriverPages from "../features/driver/DetailDriver";
import DriverPages from "../features/driver/Index";
import FinancePages from "../features/finance/Index";
import CustomerPages from "../features/customer/Index";
import RentalPages from "../features/rental/Index";
import DetailDeliveryPages from "../features/delivery/DetailDelivery";
import Layout from "../components/layouts/MainLayout";
import ProfilePages from "../pages/Profile";
import LoginPages from "../pages/Login";
import VehiclePages from "../features/vehicle/Index";
import SubmitDeliveryPages from "../features/delivery/SubmitDelivery";
import AddDeliveryPages from "../features/delivery/AddDelivery";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<LoginPages />} />
        <Route element={<Layout />}>
          {/* pages */}
          <Route path="/" element={<HomePages />} />
          {/* Profile */}
          <Route path="/profile" element={<ProfilePages />} />
          {/* car */}
          <Route path="/vehicle" element={<VehiclePages />} />
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
          <Route path="/delivery/add" element={<SubmitDeliveryPages />} />
          <Route path="/delivery/add/form" element={<AddDeliveryPages />} />
          <Route path="/delivery/:id" element={<DetailDeliveryPages />} />
          {/* finance */}
          <Route path="/finance" element={<FinancePages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
