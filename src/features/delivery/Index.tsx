import SearchInput from "../../components/input/Search.tsx";
import SubTitle from "../../components/SubTitle.tsx";
import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import Title from "../../components/Title.tsx";
import Table from "../../components/table/Table.tsx";
import ButtonComponent from "../../components/button/Index.tsx";
import Card from "../../components/card/index.tsx";

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
  {
    id: "1",
    name: "ady",
    route: "Balaraja-Cangkudu",
    deadline: "18 oktober 2024 - 21 oktober 2024",
    address: "Jl. London No.27",
  },
  {
    id: "2",
    name: "ady",
    route: "Balaraja-Cangkudu",
    deadline: "18 oktober 2024 - 21 oktober 2024",
    address: "Jl. London No.27",
  },
  {
    id: "3",
    name: "ady",
    route: "Balaraja-Cangkudu",
    deadline: "18 oktober 2024 - 21 oktober 2024",
    address: "Jl. London No.27",
  },
];

const onGoing = [];

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
          className={"bg-merah"}
          title={"Menunggu Persetujuan"}
          onClick={() => handleCardClick(tableRefWaiting)}
        />
        <Card
          className={"bg-kuning"}
          title={"Sedang Berlangsung"}
          onClick={() => handleCardClick(tableRefOngoing)}
        />
      </div>
      <div className="mb-20">
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
        <Table
          data={matches}
          onRowClick={handleRowClick}
          showActions={true}
          className="bg-merah"
        />
      </div>
    </>
  );
}

export default DeliveryPages;
