import React from "react";
import { LogOut, Truck, User } from "lucide-react";
import { useAuthStore } from "../../stores/AuthStore";

const TopBar: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 text-biru font-semibold text-lg">
        <Truck size={24} />
        <span>Dashboard Pengiriman</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <User size={18} />
          <div className="text-right leading-tight">
            <p className="font-semibold">{user?.username || "User"}</p>
            <p className="text-xs capitalize text-gray-500">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1 text-sm text-merah hover:text-red-500 transition"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default TopBar;
