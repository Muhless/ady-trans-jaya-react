import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Truck,
  ChartSpline,
  User,
  CarFront,
  Car,
} from "lucide-react";
import { useMemo } from "react";
import React from "react";

const Sidebar = () => {
  const location = useLocation();
  const menuItems = useMemo(
    () => [
      { to: "/", icon: <Home size={25} /> },
      { to: "/car", icon: <CarFront size={25} /> },
      { to: "/driver", icon: <User size={25} /> },
      { to: "/customer", icon: <Users size={25} /> },
      { to: "/rent", icon: <Car size={25} /> },
      { to: "/delivery", icon: <Truck size={25} /> },
      { to: "/finance", icon: <ChartSpline size={25} /> },
    ],
    []
  );

  return (
    <div className="fixed bottom-0 left-0 flex flex-col w-20 h-screen pt-3 text-text bg-secondary">
      <Link to={"/"}>
        <div className="flex flex-col items-center justify-center mt-3 mb-3 cursor-pointer">
          <img
            src="/assets/images/logo.png"
            alt="Ady Trans Jaya"
            className="w-16 h-auto"
          />
        </div>
      </Link>
      <nav className="flex flex-col items-center flex-1 p-4 space-y-5 justify-center">
        {menuItems.map(({ to, icon }) => (
          <Link
            key={to}
            to={to}
            className={`p-2 rounded-full flex items-center ${
              location.pathname === to
                ? "bg-biru text-text"
                : "hover:bg-merah hover:text-text"
            }`}
          >
            {icon}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
