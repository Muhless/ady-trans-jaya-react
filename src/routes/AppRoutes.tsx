import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPages from "../pages/Login";
import React from "react";
import Layout from "../components/layouts/MainLayout";
import CustomerPages from "../features/customer/Index";
import AddDeliveryPages from "../features/delivery/AddDelivery";
import DetailDeliveryPage from "../features/delivery/DetailDelivery";
import DeliveryPages from "../features/delivery/Index";
import DriverPages from "../features/driver/Index";
import RentalPages from "../features/rental/Index";
import AddTransactionPages from "../features/transaction/AddTransaction";
import DetailTransactionPages from "../features/transaction/DetailTransaction";
import TransactionPages from "../features/transaction/Index";
import VehiclePages from "../features/vehicle/Index";
import DashboardPages from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import DriverDetailPage from "../features/driver/DetailDriver";
import DeliveryMap from "../features/delivery/DeliveryMap";
import AddDeliveryItemPages from "@/features/delivery/AddDeliveryItemPages";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPages />} />
        <Route path="transaction/add/delivery" element={<AddDeliveryPages />} />

        {/* Protected routes wrapped inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<ProtectedRoute element={<DashboardPages />} />}
          />
          <Route
            path="vehicle"
            element={<ProtectedRoute element={<VehiclePages />} />}
          />
          <Route
            path="driver"
            element={<ProtectedRoute element={<DriverPages />} />}
          />
          <Route
            path="driver/:id"
            element={<ProtectedRoute element={<DriverDetailPage />} />}
          />
          <Route
            path="customer"
            element={<ProtectedRoute element={<CustomerPages />} />}
          />
          <Route
            path="rent"
            element={<ProtectedRoute element={<RentalPages />} />}
          />
          <Route
            path="delivery"
            element={<ProtectedRoute element={<DeliveryPages />} />}
          />
          {/* delivery */}
          <Route
            path="delivery/:id"
            element={<ProtectedRoute element={<DetailDeliveryPage />} />}
          />
          <Route
            path="delivery/map/:id"
            element={<ProtectedRoute element={<DeliveryMap />} />}
          />
          {/* end delivery */}
          <Route
            path="transaction"
            element={<ProtectedRoute element={<TransactionPages />} />}
          />
          <Route
            path="transaction/add"
            element={<ProtectedRoute element={<AddTransactionPages />} />}
          />
          <Route
            path="transaction/add/delivery"
            element={<ProtectedRoute element={<AddDeliveryPages />} />}
          />
          <Route
            path="transaction/add/delivery/item"
            element={<ProtectedRoute element={<AddDeliveryItemPages />} />}
          />
          <Route
            path="transaction/:id"
            element={<ProtectedRoute element={<DetailTransactionPages />} />}
          />
        </Route>

        <Route
          path="*"
          element={<div className="p-4">Halaman tidak ditemukan</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}
