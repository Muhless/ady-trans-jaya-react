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
import logo from "/assets/images/logo.png";

const Sidebar = () => {
  const location = useLocation(); // Mendapatkan path saat ini

  // Fungsi untuk mengecek apakah link aktif
  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen w-64 bg-primary text-gray-300 flex flex-col left-0 top-0 bottom-0">
      <div className="cursor-pointer items-center flex justify-center flex-col">
        <img src={logo} alt="logo" className="w-20 mt-2" />
      </div>
      <nav className="flex flex-col space-y-4 p-4">
        <Link
          to="/"
          className={`p-2 rounded flex items-center space-x-2 ${
            isActive("/") ? "bg-secondary text-white" : "hover:bg-secondary hover:text-white"
          }`}
        >
          <Home size={17} />
          <span className="text-sm">Halaman Awal</span>
        </Link>
        <hr />
        <span className="text-white">Kelola</span>
        <Link
          to="/manage/driver"
          className={`p-2 rounded flex items-center space-x-2 ${
            isActive("/manage/driver") ? "bg-secondary text-white" : "hover:bg-secondary hover:text-white"
          }`}
        >
          <User size={17} />
          <span className="text-sm">Pengemudi</span>
        </Link>
        <Link
          to="/manage/customer"
          className={`p-2 rounded flex items-center space-x-2 ${
            isActive("/manage/customer") ? "bg-secondary text-white" : "hover:bg-secondary hover:text-white"
          }`}
        >
          <Users size={17} />
          <span className="text-sm">Pelanggan</span>
        </Link>
        <Link
          to="/manage/car"
          className={`p-2 rounded flex items-center space-x-2 ${
            isActive("/manage/car") ? "bg-secondary text-white" : "hover:bg-secondary hover:text-white"
          }`}
        >
          <CarFront size={17} />
          <span className="text-sm">Kendaraan</span>
        </Link>
        <hr />
        <span className="text-white">Layanan</span>
        <Link
          to="/service/rent"
          className={`p-2 rounded flex items-center space-x-2 ${
            isActive("/service/rent") ? "bg-secondary text-white" : "hover:bg-secondary hover:text-white"
          }`}
        >
          <Car size={17} />
          <span className="text-sm">Rental</span>
        </Link>
        <Link
          to="/service/delivery"
          className={`p-2 rounded flex items-center space-x-2 ${
            isActive("/service/delivery") ? "bg-secondary text-white" : "hover:bg-secondary hover:text-white"
          }`}
        >
          <Truck size={17} />
          <span className="text-sm">Pengiriman</span>
        </Link>
        <span className="text-white">Laporan</span>
        <Link
          to="/reports/rental"
          className={`p-2 rounded flex items-center space-x-2 ${
            isActive("/reports/rental") ? "bg-secondary text-white" : "hover:bg-secondary hover:text-white"
          }`}
        >
          <LucideNotebookText size={17} />
          <span className="text-sm">Rental</span>
        </Link>
        <Link
          to="/reports/delivery"
          className={`p-2 rounded flex items-center space-x-2 ${
            isActive("/reports/delivery") ? "bg-secondary text-white" : "hover:bg-secondary hover:text-white"
          }`}
        >
          <NotepadTextIcon size={17} />
          <span className="text-sm">Pengiriman</span>
        </Link>
        <Link
          to="/reports/finance"
          className={`p-2 rounded flex items-center space-x-2 ${
            isActive("/reports/finance") ? "bg-secondary text-white" : "hover:bg-secondary hover:text-white"
          }`}
        >
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
