import React from "react";
import { Link } from "react-router-dom";
import logo from "/assets/images/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-white text-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-1">
        <div className="cursor-pointer">
            <img src={logo} alt="logo" className="w-20" />
        </div>
        <div>
          <ul className="flex space-x-6 font-jakarta text-gray-700">
            <li>
              <Link
                to="/"
                className="hover:text-orange-400 transition duration-300"
              >
                Solusi
              </Link>
            </li>
            <li>
              <Link
                to="/cars"
                className="hover:text-orange-400 transition duration-300"
              >
                Klien
              </Link>
            </li>
            <li>
              <Link
                to="/auth/login"
                className="hover:text-orange-400 transition duration-300"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-primary border rounded-full border-primary px-7 py-2 cursor-pointer hover:bg-primary hover:text-white transition duration-300 font-semibold">
          <h1>Hubungi kami</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
