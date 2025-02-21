import React from "react";
import { Helmet } from "react-helmet-async";
import CardHome from "../components/Card/CardHome";

const HomePages = () => {
  return (
    <>
      <Helmet>
        <title>Halaman Awal</title>
        <meta name="description" content="Ini adalah halaman utama" />
      </Helmet>
      <div className="grid grid-cols-3 gap-3 ">
        <div className="col-span-2">
          <div className="p-5 bg-card rounded-xl">
            <span className="text-xl font-bold text-background">
              Selamat Datang, Admin
            </span>
          </div>
          <div className="grid grid-cols-3 mb-5 text-white gap-4 mt-5">
            <CardHome
              title="pengiriman"
              background="bg-card"
              description={"cihuy"}
            />
            <CardHome
              title={"delivery"}
              background={"bg-white"}
              description={"cihuy lagi aja"}
              textColor={"text-card"}
            />
            <CardHome
              title={"delivery"}
              background={"bg-white"}
              description={"cihuy lagi aja"}
              textColor={"text-card"}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <CardHome
              title={"delivery"}
              background={"bg-white"}
              description={"cihuy lagi aja"}
              textColor={"text-card"}
            />
            <CardHome
              title={"delivery"}
              background={"bg-white"}
              description={"cihuy lagi aja"}
              textColor={"text-card"}
            />
          </div>
        </div>
        <div className="border border-card rounded-xl p-5">
          <h1>Judul</h1>
        </div>
      </div>
    </>
  );
};

export default HomePages;
