import React from "react";
import logo from "/assets/images/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-primary text-background sticky top-0 z-10 h-16 px-10 py-2 shadow-md">
      <div className="flex items-center">
        <div className="cursor-pointer bg-white p-1 rounded-lg shadow-md">
          <img src={logo} alt="Ady Trans Jaya" className="w-12 h-auto" />
        </div>
        <h1 className="ml-4 text-lg font-semibold">Ady Trans Jaya</h1>
      </div>
    </nav>
  );
};

export default Navbar;
