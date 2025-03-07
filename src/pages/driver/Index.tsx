import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../../components/Molecule/ProfileCard";
import SearchInput from "../../components/Atom/Search";
import Modal from "../../components/Molecule/Modal";
import Title from "../../components/Atom/Title";
import AddButton from "../../components/Atom/ButtonAdd";
import { Pagination } from "@mui/material";

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
  const [currentPage, setCurrentPage] = useState(0);
  const driversPerPage = 5;
  const drivers = Array.from({ length: 20 }, (_, i) => i + 1);
  const pageCount = Math.ceil(drivers.length / driversPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const offset = currentPage * driversPerPage;
  const currentDrivers = drivers.slice(offset, offset + driversPerPage);

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
        {currentDrivers.map((id) => (
          <ProfileCard key={id} onClick={() => handleCardClick(id)} />
        ))}
      </div>
      <div className="flex justify-center mt-5 text-text">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
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
