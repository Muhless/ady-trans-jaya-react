import SearchInput from "../../components/atom/Search.tsx";
import SubTitle from "../../components/atom/SubTitle.tsx";
import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import Title from "../../components/atom/Title.tsx";
import Table from "../../components/molecule/Table.tsx";
import ButtonComponent from "../../components/atom/Button.tsx";
import Card from "../../components/molecule/Card.tsx";

const matches = [
  {
    id: "01",
    name: "Manchester United",
    email: "cihuy@gmail.com",
    phone: "089813131",
    address: "Jl. London No.27",
  },
  {
    id: "02",
    name: "Liverpool",
    email: "cihuy@gmail.com",
    phone: "089813131",
    address: "Jl. London No.27",
  },
  {
    id: "03",
    name: "Chelsea",
    email: "cihuy@gmail.com",
    phone: "089813131",
    address: "Jl. London No.27",
  },
];

const onGoing = [
  {
    id: "1",
    name: "ady",
    route: "Balaraja-Cangkudu",
    deadline: "18 oktober 2024 - 21 oktober 2024",
  },
  {
    id: "2",
    name: "ady",
    route: "Balaraja-Cangkudu",
    deadline: "18 oktober 2024 - 21 oktober 2024",
  },
  {
    id: "3",
    name: "ady",
    route: "Balaraja-Cangkudu",
    deadline: "18 oktober 2024 - 21 oktober 2024",
  },
];

function DeliveryPages() {
  const navigate = useNavigate();
  const tableRefOngoing = useRef(null);
  const tableRefWaiting = useRef(null);

  const handleRowClick = (row) => {
    navigate(`/delivery/${row.id}`);
  };

  const handleAddClick = () => {
    navigate("/delivery/add");
  };

  const handleCardClick = (ref) => {
    if (ref.current) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Title title={"Pengiriman"} />
      <div className="grid grid-cols-3 gap-3 mb-10">
        <Card
          className={"bg-merah h-40"}
          title={"Menunggu Persetujuan"}
          onClick={() => handleCardClick(tableRefWaiting)}
        />
        <Card
          className={"bg-kuning"}
          title={"Sedang Berlangsung"}
          onClick={() => handleCardClick(tableRefOngoing)}
        />
        <Card className={"bg-biru"} title={"Sudah Disetujui"} />
      </div>
      <div className="mb-20">
        <SubTitle subTitle={"Sedang Berlangsung"} className="mb-3" />
        <div
          className="flex flex-row justify-between mb-3"
          ref={tableRefOngoing}
        >
          <ButtonComponent
            label="Tambah Pengiriman"
            variant="add"
            className="w-48"
            onClick={handleAddClick}
          />
          <SearchInput placeholder={"pengiriman"} />
        </div>
        <Table data={matches} onRowClick={handleRowClick} showActions={true} className="bg-merah"/>
      </div>
      <div className="mb-20">
        <div
          ref={tableRefWaiting}
          className="flex flex-row justify-between mb-3"
        >
          <SubTitle subTitle={"Menunggu Persetujuan"} />
          <SearchInput placeholder="Pengiriman" />
        </div>
        <Table data={onGoing} onRowClick={handleRowClick} className="bg-kuning"/>
      </div>
      <div className="">
        <div className="flex justify-between mb-3">
          <SubTitle subTitle="Selesai" />
          <SearchInput />
        </div>
        <Table data={matches} onRowClick={handleRowClick} className="bg-biru"/>
      </div>
    </>
  );
}

export default DeliveryPages;
