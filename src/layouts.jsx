import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-56">
        <Navbar />
        <main className="p-6 flex-1 bg-background min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
