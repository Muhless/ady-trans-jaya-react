import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Helmet } from "react-helmet-async";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Helmet>PT. Ady Trans Jaya - Jasa Transportasi</Helmet>
      <meta
        name="description"
        content="Layanan transportasi terpercaya untuk pengiriman barang."
      />
      <Sidebar />
      <div className="flex flex-col flex-1 ml-32">
        {/* <Navbar /> */}
        {/* <main className="p-6 flex-1 bg-background min-h-[calc(100vh-4rem)]"> */}
        <main className="p-6 flex-1 bg-primary">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
