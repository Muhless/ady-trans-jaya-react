import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Truck,
  ChartSpline,
  User,
  CarFront,
  Car,
  LogOut,
  Moon,
} from "lucide-react";
import { useMemo } from "react";
import React from "react";
import UserIconComponent from "../UserIcon";
import useNavigationHooks from "../../hooks/useNavigation";

const Sidebar = () => {
  const { goToHome, goToDriverPages } = useNavigationHooks();
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
    <div className="fixed bottom-0 left-0 flex flex-col w-20 h-screen pt-10 bg-sidebar">
      <div className="flex flex-col items-center justify-center cursor-pointer">
        <img
          src="/assets/images/logo.png"
          alt="Ady Trans Jaya"
          className="w-14 h-auto bg-white rounded-md"
          onClick={goToHome}
        />
      </div>
      <nav className="flex flex-col items-center justify-center flex-1 p-4 space-y-3">
        {menuItems.map(({ to, icon }) => (
          <Link
            key={to}
            to={to}
            className={`p-2 rounded-full flex items-center text-gray-300 ${
              location.pathname === to
                ? "bg-hover text-white"
                : "hover:bg-hover hover:text-white"
            }`}
          >
            {icon}
          </Link>
        ))}
      </nav>
      <div className="flex flex-col items-center justify-center space-y-4 cursor-pointer mb-7">
        <UserIconComponent
          onClick={goToDriverPages}
          className="size-9 rounded-full"
        />
        <div className="p-2 rotate-180 text-gray-300 rounded-full hover:bg-red-500 hover:text-white">
          <LogOut size={25} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
