import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../../components/card/ProfileCard";
import SearchInput from "../../components/input/Search";
import Title from "../../components/Title";
import ReactPaginate from "react-paginate";
import ButtonComponent from "../../components/button/Index";
import Modal from "../../components/Modal";

const modalInput = [
  { name: "name", label: "Nama", type: "text" },
  { name: "phone", label: "Nomor Telepon", type: "number" },
  { name: "address", label: "Alamat", type: "textarea" },
  { name: "photo", label: "Foto", type: "file" },
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

  const handlePageChange = (selected) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * driversPerPage;
  const currentDrivers = drivers.slice(offset, offset + driversPerPage);

  return (
    <>
      <Title title={"Driver"} />
      <div className="flex justify-between mb-5">
        <ButtonComponent
          label="Tambah Driver"
          variant="add"
          className="w-48"
          onClick={() => setIsModalOpen(true)}
        />
        <SearchInput placeholder="driver" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {currentDrivers.map((id) => (
          <ProfileCard key={id} onClick={() => handleCardClick(id)} />
        ))}
      </div>
      <Modal
        title="Driver"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fields={modalInput}
      />
    </>
  );
}

export default DriverPages;
