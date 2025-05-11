// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import LoginPages from "../pages/Login";
import React from "react";
import Layout from "../components/layouts/MainLayout";
import CustomerPages from "../features/customer/Index";
import AddDeliveryPages from "../features/delivery/AddDelivery";
import DetailDeliveryPage from "../features/delivery/DetailDelivery";
import DeliveryPages from "../features/delivery/Index";
import AddDriverPages from "../features/driver/AddDriver";
import DriverPages from "../features/driver/Index";
import RentalPages from "../features/rental/Index";
import AddTransactionPages from "../features/transaction/AddTransaction";
import DetailTransactionPages from "../features/transaction/DetailTransaction";
import TransactionPages from "../features/transaction/Index";
import VehiclePages from "../features/vehicle/Index";
import ProfilePages from "../pages/Profile";
import HomePages from "../pages/Dashboard";
import Spinner from "../components/Spinner";
import DashboardPages from "../pages/Dashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPages />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPages />} />
          <Route path="profile" element={<ProfilePages />} />
          <Route path="vehicle" element={<VehiclePages />} />
          <Route path="driver" element={<DriverPages />} />
          <Route path="driver/add" element={<AddDriverPages />} />
          <Route path="driver/:id" element={<DetailDeliveryPage />} />
          <Route path="customer" element={<CustomerPages />} />
          <Route path="rent" element={<RentalPages />} />
          <Route path="delivery" element={<DeliveryPages />} />
          <Route
            path="transaction/add/delivery"
            element={<AddDeliveryPages />}
          />
          <Route path="delivery/:id" element={<DetailDeliveryPage />} />
          <Route path="transaction" element={<TransactionPages />} />
          <Route path="transaction/add" element={<AddTransactionPages />} />
          <Route path="transaction/:id" element={<DetailTransactionPages />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
