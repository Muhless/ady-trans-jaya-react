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
import CarPages from "../features/car/Index";
import FinancePages from "../features/finance/Index";
import CustomerPages from "../features/customer/Index";
import RentalPages from "../features/rental/Index";
import DetailDeliveryPages from "../features/delivery/DetailDelivery";
import Layout from "../components/layouts/MainLayout";
import ProfilePages from "../pages/Profile";
import AddDeliveryPages from "../features/delivery/AddDelivery";
import AddDeliveryFormPages from "../features/delivery/AddDeliveryForm";
import LoginPages from "../pages/Login";

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
          <Route path="/delivery/add/form" element={<AddDeliveryFormPages />} />
          <Route path="/delivery/:id" element={<DetailDeliveryPages />} />
          {/* finance */}
          <Route path="/finance" element={<FinancePages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
