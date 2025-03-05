import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../../components/Molecule/ProfileCard";
import SearchInput from "../../components/Atom/Search";
import Modal from "../../components/Molecule/Modal";
import Title from "../../components/Atom/Title";
import AddButton from "../../components/Atom/ButtonAdd";

const modalInput = [
  { name: "name", label: "Nama", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Nomor HP", type: "number" },
  { name: "address", label: "Alamat", type: "text" },
];

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
        <SearchInput placeholder="pengemudi" />
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
        fields={modalInput}
      />
    </>
  );
}

export default DriverPages;
