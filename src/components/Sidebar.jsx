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
      { to: "/car", label: "Kendaraan", icon: <CarFront size={17} /> },
      { to: "/manage/driver", label: "Pengemudi", icon: <User size={17} /> },
      { to: "/customer", label: "Pelanggan", icon: <Users size={17} /> },
      { to: "/service/rent", label: "Rental", icon: <Car size={17} /> },
      {
        to: "/service/delivery",
        label: "Pengiriman",
        icon: <Truck size={17} />,
      },
      {
        to: "/reports/finance",
        label: "Transaksi",
        icon: <ChartSpline size={17} />,
      },
    ],
    []
  );

  return (
    <div className="fixed bottom-0 left-0 flex flex-col w-64 h-screen pt-20 border-r bg-card text-text border-border">
      <nav className="flex flex-col flex-1 p-4 space-y-4">
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
        <button className="flex items-center w-full p-3 space-x-2 rounded hover:bg-red-600 hover:text-white">
          <LogOut size={17} />
          <span className="text-sm">Logout</span>
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;
