import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-third text-black sticky top-0 z-50">
      <div className="container mx-auto flex justify-end items-center p-2">
        <div className="text-third border rounded-full border-third px-7 py-2 cursor-pointer hover:bg-primary hover:text-white transition duration-300 font-semibold">
          <h1>Hubungi kami</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
