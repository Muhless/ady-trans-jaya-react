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
      { to: "/", icon: <Home size={30} /> },
      { to: "/car", icon: <CarFront size={30} /> },
      { to: "/driver", icon: <User size={30} /> },
      { to: "/customer", icon: <Users size={30} /> },
      { to: "/rent", icon: <Car size={30} /> },
      { to: "/delivery", icon: <Truck size={30} /> },
      { to: "/finance", icon: <ChartSpline size={30} /> },
    ],
    []
  );

  return (
    <div className="fixed bottom-0 left-0 flex flex-col w-32  h-screen pt-3 text-text border-r bg-sidebar border-border">
      <div className="flex flex-col items-center justify-center mb-3 cursor-pointer mt-3">
        <img
          src="/assets/images/logo.png"
          alt="Ady Trans Jaya"
          className="w-24 h-auto"
        />
      </div>
      <nav className="flex flex-col flex-1 p-4 space-y-3 items-center">
        {menuItems.map(({ to, icon }) => (
          <Link
            key={to}
            to={to}
            className={`p-3 rounded-full flex items-center ${
              location.pathname === to
                ? "bg-card text-white"
                : "hover:bg-hover hover:text-text"
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
