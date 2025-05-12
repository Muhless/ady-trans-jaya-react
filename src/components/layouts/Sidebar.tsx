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
  Handshake,
} from "lucide-react";
import { useMemo } from "react";
import React from "react";
import UserIconComponent from "../UserIcon";
import useNavigationHooks from "../../hooks/useNavigation";
import { useAuthStore } from "../../stores/AuthStore";

const Sidebar = () => {
  const { goToHome, goToDriverPages } = useNavigationHooks();
  const location = useLocation();
  const menuItems = useMemo(
    () => [
      { to: "/", icon: <Home size={20} /> },
      { to: "/driver", icon: <User size={20} /> },
      { to: "/customer", icon: <Users size={20} /> },
      { to: "/vehicle", icon: <CarFront size={20} /> },
      // { to: "/rent", icon: <Car size={20} /> },
      { to: "/delivery", icon: <Truck size={20} /> },
      { to: "/transaction", icon: <Handshake size={20} /> },
    ],
    []
  );

  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="fixed bottom-0 left-0 flex flex-col w-20 h-screen bg-gray-800">
      <div className="flex justify-center cursor-pointer mt-5">
        <img
          src="/assets/images/logo.png"
          alt="Ady Trans Jaya"
          className="w-14 h-auto"
          onClick={goToHome}
        />
      </div>
      <nav className="flex flex-col items-center flex-1 p-4 space-y-2 mt-3">
        {menuItems.map(({ to, icon }) => {
          const isActive =
            to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(to);

          return (
            <Link
              key={to}
              to={to}
              className={`p-3 rounded-md flex items-center transition-colors ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:bg-white/20 hover:text-white"
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
          className="size-8 rounded-full"
        />
        <div
          className="p-3 rotate-180 text-gray-300 rounded-md hover:bg-red-500 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut size={20} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
