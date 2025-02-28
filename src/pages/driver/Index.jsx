import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../../components/card/ProfileCard";
import AddButton from "../../components/ButtonAdd";
import SearchInput from "../../components/Search";
import Modal from "../../components/Modal";
import Title from "../../components/Title";

function DriverPages() {
  const navigate = useNavigate();
  const handleCardClick = (driverId) => {
    navigate(`/driver/${driverId}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Title title={"Pengemudi"} />
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Pengemudi"
        label1="Nama Pengemudi"
        label2="Nomor Telepon"
        type2="number"
        label3="Alamat"
        type3="text"
        // TODO: aktif/nonaktif
        label4=""
      />
    </>
  );
}

export default DriverPages;
