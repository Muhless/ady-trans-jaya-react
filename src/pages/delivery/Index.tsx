import SearchInput from "../../components/Atom/Search";
import SubTitle from "../../components/Atom/SubTitle";
import { useNavigate } from "react-router-dom";
import React from "react";
import AddButton from "../../components/Atom/ButtonAdd";
import Title from "../../components/Atom/Title";
import Table from "../../components/Molecule/Table.tsx";
import DeliveryCard from "../../components/Molecule/DeliveryCard.tsx";
import ButtonComponent from "../../components/Atom/Button.tsx";

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
  const handleRowClick = (row) => {
    navigate(`/delivery/${row.id}`);
  };

  const handleAddClick = () => {
    navigate("/delivery/add");
  };

  const handleAddMap = () => {
    navigate("/delivery/map");
  };

  return (
    <>
      <Title title={"Pengiriman"} />
      <div className="grid grid-cols-3 gap-3">
        <DeliveryCard className={"bg-merah"} text={"Menunggu Persetujuan"} />
        <DeliveryCard className={"bg-kuning"} text={"Sedang Berlangsung"} />
        <DeliveryCard className={"bg-biru"} text={"Sudah Disetujui"} />
      </div>
      <div className="grid grid-cols-3 my-5 gap-5">
        <div className="col-span-2">
          <div className="items-center justify-between mb-5">
            <SubTitle subTitle={"Sedang Berlangsung"} className={"mb-5"} />
            <div className="flex flex-row justify-between">
              <ButtonComponent
                label="Tambah Pengiriman"
                variant="add"
                onClick={handleAddClick}
              />
              <SearchInput placeholder={"pengiriman"} />
            </div>
          </div>
          <Table
            data={matches}
            onRowClick={handleRowClick}
            showActions={true}
          />
        </div>
        <div className="col-span-1">
          <div className="">
            <SubTitle subTitle={"Menunggu Persetujuan"} className={"mb-5"} />
            <Table data={onGoing} onRowClick={handleRowClick} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveryPages;
