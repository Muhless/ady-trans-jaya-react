import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-white overflow-auto ml-64">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
