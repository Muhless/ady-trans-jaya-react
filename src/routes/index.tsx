import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import DeliveryPages from "../features/delivery/Index";
import AddDriverPages from "../features/driver/AddDriver";
import DetailDriverPages from "../features/driver/DetailDriver";
import DriverPages from "../features/driver/Index";
import CustomerPages from "../features/customer/Index";
import RentalPages from "../features/rental/Index";
import Layout from "../components/layouts/MainLayout";
import ProfilePages from "../pages/Profile";
import VehiclePages from "../features/vehicle/Index";
import AddDeliveryPages from "../features/delivery/AddDelivery";
import TransactionPages from "../features/transaction/Index";
import AddTransactionPages from "../features/transaction/AddTransaction";
import DetailTransactionPages from "../features/transaction/DetailTransaction";
import DetailDeliveryPage from "../features/delivery/DetailDelivery";
import HomePages from "../pages/Homepage";
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
          <Route
            path="/transaction/add/delivery"
            element={<AddDeliveryPages />}
          />
          <Route path="/delivery/:id" element={<DetailDeliveryPage />} />
          {/* transaction */}
          <Route path="/transaction" element={<TransactionPages />} />
          <Route path="/transaction/add" element={<AddTransactionPages />} />
          <Route path="/transaction/:id" element={<DetailTransactionPages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
