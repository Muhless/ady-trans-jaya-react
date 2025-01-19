import React from "react";
import banner from "/assets/images/obi-pixel9propics-aZKJEvydrNM-unsplash.jpg";
import Navbar from "../components/Navbar";

const HomePages = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <div className="relative">
        <img
          src={banner}
          alt={banner}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
      <div>
        <h1>cihuy</h1>
      </div>
    </div>
  );
};

export default HomePages;
