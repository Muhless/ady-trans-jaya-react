import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">
          <Link to="/">Ady Trans Jaya</Link>
        </h1>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:text-teal-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-teal-400 transition duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/auth/login"
              className="hover:text-red-400 transition duration-300"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
