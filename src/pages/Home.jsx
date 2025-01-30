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
      <div className="container mx-auto">
        <h1>cihuy</h1>
        <Carousel/>
      </div>
    </>
  );
};

export default HomePages;
