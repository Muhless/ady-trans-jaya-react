import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import React from "react";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-20">
        {/* <Navbar /> */}
        {/* <main className="p-6 flex-1 bg-background  */}
        <main className="flex-1 bg-background text-text overflow-auto h-screen p-6">
          <div className="bg-background px-10 py-4 rounded-xl min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
