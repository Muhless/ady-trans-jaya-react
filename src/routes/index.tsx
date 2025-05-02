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
import CustomerPages from "../features/customer/Index";
import RentalPages from "../features/rental/Index";
import DetailDeliveryPages from "../features/delivery/DetailDelivery";
import Layout from "../components/layouts/MainLayout";
import ProfilePages from "../pages/Profile";
import LoginPages from "../pages/Login";
import VehiclePages from "../features/vehicle/Index";
import SubmitDeliveryPages from "../features/transaction/AddTransaction";
import AddDeliveryPages from "../features/delivery/AddDelivery";
import TransactionPages from "../features/transaction/Index";
import AddTransactionPages from "../features/transaction/AddTransaction";
import TransactionSummaryForm from "../components/form/TransactionSummaryForm";

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
          <Route path="/delivery/:id" element={<DetailDeliveryPages />} />
          {/* transaction */}
          <Route path="/transaction" element={<TransactionPages />} />
          <Route path="/transaction/add" element={<AddTransactionPages />} />
          <Route
            path="/transaction/add/summary"
            element={<TransactionSummaryForm />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
