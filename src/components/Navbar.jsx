import { ChevronDown, EllipsisIcon } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <nav className="h-16 items-center flex p-6 bg-white shadow-md text-text gap-3 justify-end">
      <h1 className="text-xl">Admin</h1>
      <img
        src="/assets/images/profile/1.jpg"
        alt=""
        className="size-11 rounded-full"
      />
      <ChevronDown/>
    </nav>
  );
};

export default Navbar;
