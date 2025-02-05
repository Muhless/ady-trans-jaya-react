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
      <div className="container mx-auto text-white">
        <p className="text-5xl">Welcome</p>
        <div className="flex flex-row justify-between">
          <div className="py-32 px-44 rounded-3xl bg-secondary">
            cihuy
          </div>
          <div className="py-32 px-44 rounded-3xl bg-secondary">
            cihuy
          </div>
          <div className="py-32 px-44 rounded-3xl bg-secondary">
            cihuy
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="py-32 px-44 rounded-3xl bg-secondary">
            cihuy
          </div>
          <div className="py-32 px-44 rounded-3xl bg-secondary">
            cihuy
          </div>
          <div className="py-32 px-44 rounded-3xl bg-secondary">
            cihuy
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePages;
