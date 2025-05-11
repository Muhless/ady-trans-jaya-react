import { Route } from "react-router-dom";
import Layout from "../components/layouts/MainLayout";

import ProfilePages from "../pages/Profile";
import VehiclePages from "../features/vehicle/Index";
import DriverPages from "../features/driver/Index";
import AddDriverPages from "../features/driver/AddDriver";
import DetailDriverPages from "../features/driver/DetailDriver";
import CustomerPages from "../features/customer/Index";
import RentalPages from "../features/rental/Index";
import DeliveryPages from "../features/delivery/Index";
import AddDeliveryPages from "../features/delivery/AddDelivery";
import DetailDeliveryPage from "../features/delivery/DetailDelivery";
import TransactionPages from "../features/transaction/Index";
import AddTransactionPages from "../features/transaction/AddTransaction";
import DetailTransactionPages from "../features/transaction/DetailTransaction";
import React from "react";
import DashboardPages from "../pages/Dashboard";

export default function PrivateRoutes() {
  return (
    <Route element={<Layout />}>
      <Route path="/" element={<DashboardPages />} />
      <Route path="/profile" element={<ProfilePages />} />
      <Route path="/vehicle" element={<VehiclePages />} />
      <Route path="/driver" element={<DriverPages />} />
      <Route path="/driver/add" element={<AddDriverPages />} />
      <Route path="/driver/:id" element={<DetailDriverPages />} />
      <Route path="/customer" element={<CustomerPages />} />
      <Route path="/rent" element={<RentalPages />} />
      <Route path="/delivery" element={<DeliveryPages />} />
      <Route path="/transaction/add/delivery" element={<AddDeliveryPages />} />
      <Route path="/delivery/:id" element={<DetailDeliveryPage />} />
      <Route path="/transaction" element={<TransactionPages />} />
      <Route path="/transaction/add" element={<AddTransactionPages />} />
      <Route path="/transaction/:id" element={<DetailTransactionPages />} />
    </Route>
  );
}
