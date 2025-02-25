import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../../components/card/ProfileCard";
import AddButton from "../../components/button/ButtonAdd";
import SearchInput from "../../components/Search";

function DriverPages() {
  const navigate = useNavigate();
  const handleCardClick = (driverId) => {
    navigate(`/driver/${driverId}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <h1 className="text-4xl text-text font-bold py-5">Pengemudi</h1>
      <div className="flex justify-between mb-5">
        <AddButton
          name={"Pengemudi"}
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
        <SearchInput placeholder="cari pengemudi" />
      </div>
      <div className="px-10">
        <Link to={"/driver/add"}></Link>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
          <ProfileCard key={id} onClick={() => handleCardClick(id)} />
        ))}
      </div>
    </>
  );
}

export default DriverPages;
