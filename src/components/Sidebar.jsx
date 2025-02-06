import React from "react";
import { Link } from "react-router-dom";
import { Home, Map, Settings, LogOut, User2Icon, CarIcon, Users, Route, Truck, CalendarClock, ChartSpline } from "lucide-react";
import logo from "/assets/images/logo.png";


const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-primary text-gray-300 flex flex-col left-0 top-0 bottom-0">
         <div className="cursor-pointer items-center flex justify-center">
            <img src={logo} alt="logo" className="w-28 mt-2" />
        </div>
      <nav className="flex flex-col space-y-4 p-4">
        <Link to="/" className="p-2 rounded hover:bg-secondary hover:text-white flex items-center space-x-2">
          <Home size={17} />
          <span className="text-sm">Dashboard</span>
        </Link>
        <hr />
        <span className="text-white">Manajemen</span>
        <Link to="/cars" className="p-2 rounded hover:bg-secondary hover:text-white flex items-center space-x-2">
          <User2Icon size={17} />
          <span className="text-sm">Karyawan</span>
        </Link>
        <Link to="/cars" className="p-2 rounded hover:bg-secondary hover:text-white flex items-center space-x-2">
          <CarIcon size={17} />
          <span className="text-sm">Mobil</span>
        </Link>
        <Link to="/settings" className="p-2 rounded hover:bg-secondary hover:text-white flex items-center space-x-2">
          <Users size={17} />
          <span className="text-sm">Pelanggan</span>
        </Link>
        <hr />
        <span className="text-white">Laporan</span>
        <Link to="/cars" className="p-2 rounded hover:bg-secondary hover:text-white flex items-center space-x-2">
          <Truck size={17} />
          <span className="text-sm">Pengiriman</span>
        </Link>
        <Link to="/cars" className="p-2 rounded hover:bg-secondary hover:text-white flex items-center space-x-2">
          <CalendarClock size={17} />
          <span className="text-sm">Rental</span>
        </Link>
        <Link to="/cars" className="p-2 rounded hover:bg-secondary hover:text-white flex items-center space-x-2">
          <ChartSpline size={17} />
          <span className="text-sm">Keuangan</span>
        </Link>
        <hr />
        <button className="p-2 rounded hover:bg-red-600 hover:text-white flex items-center space-x-2">
          <LogOut size={17} />
          <span className="text-sm">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
