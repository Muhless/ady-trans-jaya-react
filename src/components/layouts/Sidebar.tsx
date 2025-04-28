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
      { to: "/", icon: <Home size={23} /> },
      { to: "/driver", icon: <User size={23} /> },
      { to: "/customer", icon: <Users size={23} /> },
      { to: "/vehicle", icon: <CarFront size={23} /> },
      // { to: "/rent", icon: <Car size={23} /> },
      { to: "/delivery", icon: <Truck size={23} /> },
      { to: "/transaction", icon: <ChartSpline size={23} /> },
    ],
    []
  );

  return (
    <div className="fixed bottom-0 left-0 flex flex-col w-20 h-screen bg-sidebar">
      <div className="flex justify-center cursor-pointer mt-5">
        <img
          src="/assets/images/logo.png"
          alt="Ady Trans Jaya"
          className="w-14 h-auto"
          onClick={goToHome}
        />
      </div>
      <nav className="flex flex-col items-center justify-center flex-1 p-4 space-y-3">
        {menuItems.map(({ to, icon }) => {
          const isActive =
            to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(to);

          return (
            <Link
              key={to}
              to={to}
              className={`p-2 rounded-full flex items-center transition-colors ${
                isActive
                  ? "bg-white/20 text-white"
                  : "text-gray-300 hover:bg-hover hover:text-white"
              }`}
            >
              {icon}
            </Link>
          );
        })}
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
