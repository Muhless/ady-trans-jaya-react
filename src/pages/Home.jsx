import React from "react";
import banner from "/assets/images/obi-pixel9propics-aZKJEvydrNM-unsplash.jpg";
import { Helmet } from "react-helmet-async";
import Carousel from "../components/carousel";

const HomePages = () => {
  return (
    <>
      <Helmet>
        <title>Homepage</title>
        <meta name="description" content="Ini adalah halaman utama" />
      </Helmet>
      <div className="container mx-auto text-white mt-2">
        <p className="text-4xl">Dashboard</p>
        <div className="mt-12">
          <div className="gap-7 h-72 grid grid-cols-3">
            <div className="bg-third p-6 rounded-3xl flex flex-col">
              <span className="text-2xl font-bold text-black">Judul</span>
              <img src="public\assets\images\home.png" alt="icon" className="w-72 mx-auto"/>
            </div>
            <div className="bg-secondary p-6 rounded-3xl">
              <span className="text-2xl font-bold">Judul</span>
            </div>
            <div className="bg-secondary p-6 rounded-3xl">
              <span className="text-2xl font-bold">Judul</span>
            </div>
          </div>
          <div className="grid grid-cols-3 rounded-3xl gap-7 mt-7 h-72">
            <div className="bg-secondary p-6 rounded-3xl col-span-2">
              <span className="text-2xl font-bold">Judul</span>
            </div>
            <div className="bg-secondary p-6 rounded-3xl">
              <span className="text-2xl font-bold">Judul</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePages;
