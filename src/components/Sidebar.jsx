import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LogOut,
  Users,
  Truck,
  ChartSpline,
  User,
  LucideNotebookText,
  CarFront,
  NotepadTextIcon,
  Car,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen fixed top-20 bg-white w-64 text-black flex flex-col left-0 bottom-0 border-black">
      <nav className="flex flex-col space-y-2 p-4">
        <Link
          to="/"
          className={`p-3 rounded flex items-center space-x-2 ${
            isActive("/")
              ? "bg-secondary text-white"
              : "hover:bg-secondary hover:text-white"
          }`}
        >
          <Home size={17} />
          <span className="text-sm">Halaman Awal</span>
        </Link>
        <hr className="border-black" />
        <span className="text-gray-500">Kelola</span>
        <Link
          to="/manage/driver"
          className={`p-3 rounded flex items-center space-x-2 ${
            isActive("/manage/driver")
              ? "bg-secondary text-white"
              : "hover:bg-secondary hover:text-white"
          }`}
        >
          <User size={17} />
          <span className="text-sm">Pengemudi</span>
        </Link>
        <Link
          to="/manage/customer"
          className={`p-3 rounded flex items-center space-x-2 ${
            isActive("/manage/customer")
              ? "bg-secondary text-white"
              : "hover:bg-secondary hover:text-white"
          }`}
        >
          <Users size={17} />
          <span className="text-sm">Pelanggan</span>
        </Link>
        <Link
          to="/manage/car"
          className={`p-3 rounded flex items-center space-x-2 ${
            isActive("/manage/car")
              ? "bg-secondary text-white"
              : "hover:bg-secondary hover:text-white"
          }`}
        >
          <CarFront size={17} />
          <span className="text-sm">Kendaraan</span>
        </Link>
        <hr className="border-black" />
        <span className="text-gray-500">Layanan</span>
        <Link
          to="/service/rent"
          className={`p-3 rounded flex items-center space-x-2 ${
            isActive("/service/rent")
              ? "bg-secondary text-white"
              : "hover:bg-secondary hover:text-white"
          }`}
        >
          <Car size={17} />
          <span className="text-sm">Rental</span>
        </Link>
        <Link
          to="/service/delivery"
          className={`p-3 rounded flex items-center space-x-2 ${
            isActive("/service/delivery")
              ? "bg-secondary text-white"
              : "hover:bg-secondary hover:text-white"
          }`}
        >
          <Truck size={17} />
          <span className="text-sm">Pengiriman</span>
        </Link>
        <span className="text-gray-500">Laporan</span>
        <Link
          to="/reports/rental"
          className={`p-3 rounded flex items-center space-x-2 ${
            isActive("/reports/rental")
              ? "bg-secondary text-white"
              : "hover:bg-secondary hover:text-white"
          }`}
        >
          <LucideNotebookText size={17} />
          <span className="text-sm">Rental</span>
        </Link>
        <Link
          to="/reports/delivery"
          className={`p-3 rounded flex items-center space-x-2 ${
            isActive("/reports/delivery")
              ? "bg-secondary text-white"
              : "hover:bg-secondary hover:text-white"
          }`}
        >
          <NotepadTextIcon size={17} />
          <span className="text-sm">Pengiriman</span>
        </Link>
        <Link
          to="/reports/finance"
          className={`p-3 rounded flex items-center space-x-2 ${
            isActive("/reports/finance")
              ? "bg-secondary text-white"
              : "hover:bg-secondary hover:text-white"
          }`}
        >
          <ChartSpline size={17} />
          <span className="text-sm">Keuangan</span>
        </Link>
        <hr className="border-black" />
        <button className="p-3 rounded hover:bg-red-600 hover:text-white flex items-center space-x-2">
          <LogOut size={17} />
          <span className="text-sm">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
