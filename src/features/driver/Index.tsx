import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../../components/molecule/ProfileCard";
import SearchInput from "../../components/atom/Search";
import Modal from "../../components/molecule/Modal";
import Title from "../../components/atom/Title";
import ReactPaginate from "react-paginate";
import ButtonComponent from "../../components/atom/Button";

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
      <div className="px-10">
        {currentDrivers.map((id) => (
          <ProfileCard key={id} onClick={() => handleCardClick(id)} />
        ))}
      </div>
      <div className="flex justify-center mt-5 text-text">
        {/* TODO: fix paginate */}
        <ReactPaginate
          previousLabel={"Kembali"}
          nextLabel={"Berikutnya"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={"pagination flex gap-2"}
          activeClassName="text-blue-500 font-bold"
          pageClassName="border px-3 py-1 rounded-lg cursor-pointer text-center"
          previousClassName="border px-3 py-1 rounded-lg cursor-pointer"
          nextClassName="border px-3 py-1 rounded-lg cursor-pointer"
          breakClassName="border px-3 py-1 rounded-lg cursor-pointer"
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
