import React from "react";
import { Helmet } from "react-helmet-async";
import ProfileCard from "../../../../components/ProfileCard";

function DriverPages() {
  return (
    <>
      <Helmet>
        <title>Halaman Daftar Pengemudi</title>
        <meta
          name="description"
          content="Ini adalah halaman kelola pengemudi"
        />
      </Helmet>
      <div className="grid grid-cols-2 gap-3">
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </div>
    </>
  );
}

export default DriverPages;
