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
import UserIconComponent from "../atom/UserIcon";
import useNavigationHooks from "../../hooks/useNavigation";

const Sidebar = () => {
  const { goToHome, goToUserProfile } = useNavigationHooks();
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
    <div className="fixed bottom-0 left-0 flex flex-col w-32 h-screen pt-3 text-text bg-secondary">
      <div className="flex flex-col items-center justify-center cursor-pointer">
        <img
          src="/assets/images/logo.png"
          alt="Ady Trans Jaya"
          className="w-28 h-auto"
          onClick={goToHome}
        />
      </div>
      <nav className="flex flex-col items-center justify-center flex-1 p-4 space-y-2">
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
      <div className="flex flex-col items-center justify-center space-y-4 cursor-pointer mb-7">
        <UserIconComponent
          onClick={goToUserProfile}
          className="size-10 rounded-full"
        />
        <div className="p-2 rotate-180 rounded-full hover:bg-red-500">
          <LogOut size={25} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
