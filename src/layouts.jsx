import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-white overflow-auto ml-64">
          <Outlet /> {/* Menampilkan halaman sesuai rute */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
