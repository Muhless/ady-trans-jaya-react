import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Truck,
  User,
  CarFront,
  Handshake,
  LogOut,
} from "lucide-react";
import { useMemo } from "react";
import React from "react";
import UserIconComponent from "../UserIcon";
import useNavigationHooks from "../../hooks/useNavigation";
import { useAuthStore } from "../../stores/AuthStore";

const Sidebar = () => {
  const { goToHome } = useNavigationHooks();
  const { role, logout } = useAuthStore();
  const location = useLocation();

  const menuItems = useMemo(
    () => [
      { to: "/", icon: <Home size={20} />, label: "Home" },
      { to: "/driver", icon: <User size={20} />, label: "Driver" },
      { to: "/customer", icon: <Users size={20} />, label: "Customer" },
      { to: "/vehicle", icon: <CarFront size={20} />, label: "Vehicle" },
      { to: "/delivery", icon: <Truck size={20} />, label: "Delivery" },
      {
        to: "/transaction",
        icon: <Handshake size={20} />,
        label: "Transaction",
      },
    ],
    []
  );

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside className="fixed left-0 top-0 flex flex-col items-center w-20 h-screen bg-sidebar shadow-lg">
      {/* Logo */}
      <div className="mt-4 mb-6 cursor-pointer" onClick={goToHome}>
        <img
          src="/assets/images/logo.png"
          alt="Ady Trans Jaya"
          className="w-12 h-auto"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col items-center flex-1 space-y-3">
        {menuItems.map(({ to, icon }) => {
          const isActive =
            to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(to);

          return (
            <Link
              key={to}
              to={to}
              className={`p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {icon}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col items-center mb-5 space-y-3">
        <UserIconComponent
          className="size-10 rounded-full bg-white"
          src={
            role === "admin"
              ? "/assets/images/businesswoman.png"
              : "/assets/images/businessman.png"
          }
        />
        <span className="text-[10px] font-medium bg-white/10 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
          {role || "Guest"}
        </span>
        <button
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-white hover:bg-red-500 rounded-md transition-colors"
        >
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
