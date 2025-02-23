import { ChevronDown } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div className="border-b border-white">
      <nav className="flex items-center justify-end gap-3 p-6 shadow-md bg-background h-14 text-text">
        <h1 className="text-lg">Admin</h1>
        <img
          src="/assets/images/profile/1.jpg"
          alt=""
          className="rounded-full size-10"
        />
        <ChevronDown />
      </nav>
    </div>
  );
};

export default Navbar;
