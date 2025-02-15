import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LogOut,
  Users,
  Truck,
  ChartSpline,
  User,
  CarFront,
  Car,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = useMemo(
    () => [
      { to: "/", label: "Halaman Awal", icon: <Home size={17} /> },
      { to: "/manage/car", label: "Kendaraan", icon: <CarFront size={17} /> },
      { to: "/manage/driver", label: "Pengemudi", icon: <User size={17} /> },
      { to: "/manage/customer", label: "Pelanggan", icon: <Users size={17} /> },
      { to: "/service/rent", label: "Rental", icon: <Car size={17} /> },
      { to: "/service/delivery", label: "Pengiriman", icon: <Truck size={17} /> },
      { to: "/reports/finance", label: "Transaksi", icon: <ChartSpline size={17} /> },
    ],
    []
  );

  return (
    <div className="h-screen border-r fixed pt-20 bg-card w-64 text-text flex flex-col left-0 bottom-0 border-border">
      <nav className="flex-1 flex flex-col space-y-2 p-4">
        {menuItems.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            className={`p-3 rounded flex items-center space-x-2 ${
              location.pathname === to
                ? "bg-hover text-white"
                : "hover:bg-hover hover:text-white"
            }`}
          >
            {icon}
            <span className="text-sm">{label}</span>
          </Link>
        ))}
      </nav>

      {/* <div className="p-4">
        <button className="w-full p-3 rounded hover:bg-red-600 hover:text-white flex items-center space-x-2">
          <LogOut size={17} />
          <span className="text-sm">Logout</span>
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;
