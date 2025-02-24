import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../../components/card/ProfileCard";
import AddDriverCard from "../../components/card/AddDriverCard";
import AddButton from "../../components/button/ButtonAdd";
import SearchInput from "../../components/Search";

function DriverPages() {
  const navigate = useNavigate();
  const handleCardClick = (driverId) => {
    navigate(`/driver/${driverId}`);
  };

  return (
    <>
      <h1 className="text-4xl text-text font-bold py-5">Pengemudi</h1>
      <div className="flex justify-between mb-5">
        <AddButton name={"Pengemudi"}/>
        <SearchInput placeholder="cari pengemudi" />
      </div>
      <div className="grid grid-cols-2 gap-5 text-text">
        <div className="w-full justify-center flex">
          <div className="h-[40rem] w-10/12 bg-white rounded-lg p-5 text-primary">
            <h1 className="text-center text-2xl">Profil Pengemudi</h1>
          </div>
        </div>
        <div className="overflow-auto pr-2 max-h-[40rem]">
          <Link to={"/driver/add"}></Link>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
            <ProfileCard key={id} onClick={() => handleCardClick(id)} />
          ))}
        </div>
      </div>
    </>
  );
}

export default DriverPages;
