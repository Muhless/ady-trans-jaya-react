import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import React from "react";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-20">
        <main className="flex-1 bg-bg text-text overflow-auto h-screen py-5 px-10">
          <div className="rounded-xl min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
