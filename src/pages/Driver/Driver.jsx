import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../../components/Card/ProfileCard";
import AddDriverCard from "../../components/Card/AddDriverCard";

function DriverPages() {
  const navigate = useNavigate();
  const handleCardClick = (driverId) => {
    navigate(`/manage/driver/${driverId}`);
  };

  return (
    <div className="h-full">
      <Helmet>
        <title>Halaman Daftar Pengemudi</title>
        <meta
          name="description"
          content="Ini adalah halaman kelola pengemudi"
        />
      </Helmet>
      <div className="flex-1 ">
        <div className="grid grid-cols-3 gap-5">
          <Link to={"/manage/driver/add"}>
            <AddDriverCard />
          </Link>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
            <ProfileCard key={id} onClick={() => handleCardClick(id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DriverPages;
