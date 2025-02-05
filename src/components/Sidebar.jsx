import React from "react";
import { Link } from "react-router-dom";
import { Home, Map, Settings, LogOut } from "lucide-react";
import logo from "/assets/images/logo.png";


const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-primary text-gray-300 flex flex-col left-0 top-0 bottom-0">
         <div className="cursor-pointer items-center flex justify-center">
            <img src={logo} alt="logo" className="w-20" />
        </div>
      <nav className="flex flex-col space-y-4 p-4">
        <Link to="/" className="p-2 rounded hover:bg-secondary hover:text-white flex items-center space-x-2">
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/cars" className="p-2 rounded hover:bg-secondary hover:text-white flex items-center space-x-2">
          <Map size={20} />
          <span>Cars</span>
        </Link>
        <Link to="/settings" className="p-2 rounded hover:bg-secondary hover:text-white flex items-center space-x-2">
          <Settings size={20} />
          <span>Settings</span>
        </Link>
        <button className="p-2 rounded hover:bg-red-600 hover:text-white flex items-center space-x-2 mt-auto">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
