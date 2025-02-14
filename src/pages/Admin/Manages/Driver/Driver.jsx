import React from "react";
import { Helmet } from "react-helmet-async";
import ProfileCard from "../../../../components/ProfileCard";
import { useNavigate } from "react-router-dom";

function DriverPages() {
  const navigate = useNavigate();
  const handleCardClick = (driverId) => {
    navigate("/manage/driver/${driverId}");
  };
  return (
    <div className="h-screen">
      <Helmet>
        <title>Halaman Daftar Pengemudi</title>
        <meta
          name="description"
          content="Ini adalah halaman kelola pengemudi"
        />
      </Helmet>
      <div className="grid grid-cols-3 gap-5">
        {[1, 2, 3, 4].map((id) => (
          <ProfileCard key={id} onClick={() => handleCardClick(id)} />
        ))}
        <ProfileCard />
        <ProfileCard />
      </div>
    </div>
  );
}

export default DriverPages;
