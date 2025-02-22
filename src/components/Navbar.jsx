import React from "react";
import logo from "/assets/images/logo.png";

const Navbar = () => {
  return (
    <nav className="h-14 items-center flex p-6 bg-white shadow-md text-text gap-3">
       <div className="flex flex-col items-center justify-center mb-3">
        <div className="shadow-md cursor-pointer">
          <img
            src="/assets/images/logo.png"
            alt="Ady Trans Jaya"
            className="w-12 h-auto"
          />
        </div>
        <h1 className="ml-2 text-lg font-semibold text-white">
          Ady Trans Jaya
        </h1>
      </div>
     <div>
     <h1>Admin</h1>
      <img
        src="/assets/images/profile/1.jpg"
        alt=""
        className="size-11 rounded-full"
      />
     </div>
    </nav>
  );
};

export default Navbar;
