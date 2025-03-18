import { Outlet } from "react-router-dom";
import Sidebar from "../organism/Sidebar";
import React from "react";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-20">
        {/* <Navbar /> */}
        {/* <main className="p-6 flex-1 bg-background min-h-[calc(100vh-4rem)]"> */}
        <main className="p-6 flex-1 bg-primary text-text">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
