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
import GroupDeliveryPages from "../features/delivery/GroupDelivery";
import AddDeliveryPages from "../features/delivery/AddDelivery";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePages />} />
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
          <Route path="/delivery/add/group" element={<GroupDeliveryPages />} />
          <Route path="/delivery/add" element={<AddDeliveryPages />} />
          <Route path="/delivery/:id" element={<DetailDeliveryPages />} />
          {/* finance */}
          <Route path="/finance" element={<FinancePages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
