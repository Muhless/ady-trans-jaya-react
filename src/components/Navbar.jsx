import React from "react";
import logo from "/assets/images/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-white border-b-2 text-black sticky top-0 z-10 h-16">
      <div className="flex flex-row items-center">
        <div className="cursor-pointer items-center ">
          <img src={logo} alt="logo" className="w-20 mt-2" />
        </div>
        <h1>Cihuy</h1>
      </div>
    </nav>
  );
};

export default Navbar;
