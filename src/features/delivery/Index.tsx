import SearchInput from "../../components/input/Search.tsx";
import SubTitle from "../../components/SubTitle.tsx";
import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import Title from "../../components/Title.tsx";
import Table from "../../components/table/Table.tsx";
import ButtonComponent from "../../components/button/Index.tsx";
import Card from "../../components/card/index.tsx";
import useNavigationHooks from "../../hooks/useNavigation.ts";

const matches = [
  {
    id: "01",
    customer: "Manchester United",
    email: "cihuy@gmail.com",
    phone: "089813131",
    address: "Jl. London No.27",
  },
  {
    id: "02",
    customer: "Liverpool",
    email: "cihuy@gmail.com",
    phone: "089813131",
    address: "Jl. London No.27",
  },
  {
    id: "03",
    customer: "Chelsea",
    email: "cihuy@gmail.com",
    phone: "089813131",
    address: "Jl. London No.27",
  },
  {
    id: "1",
    customer: "ady",
    route: "Balaraja-Cangkudu",
    deadline: "18 oktober 2024 - 21 oktober 2024",
    address: "Jl. London No.27",
  },
  {
    id: "2",
    customer: "ady",
    route: "Balaraja-Cangkudu",
    deadline: "18 oktober 2024 - 21 oktober 2024",
    address: "Jl. London No.27",
  },
  {
    id: "3",
    customer: "ady",
    route: "Balaraja-Cangkudu",
    deadline: "18 oktober 2024 - 21 oktober 2024",
    address: "Jl. London No.27",
  },
];

function DeliveryPages() {
  const { goToAddDelivery, goToDetailDelivery } = useNavigationHooks();

  return (
    <>
      <Title title={"Pengiriman"} />
      <div className="grid grid-cols-3 gap-3 mb-10">
        <Card className={"bg-kuning"} title={"Menunggu Persetujuan"} />
        <Card className={"bg-biru"} title={"Sedang Berlangsung"} />
        <Card className={"bg-merah"} title={"Dibatalkan"} />
      </div>
      <div className="mb-20">
        <div className="flex flex-row justify-between mb-3">
          <ButtonComponent
            label="Tambah Pengiriman"
            variant="add"
            className="w-48"
            onClick={goToAddDelivery}
          />
          <SearchInput placeholder={"pengiriman"} />
        </div>
        <Table
          data={matches}
          onRowClick={goToDetailDelivery}
          showActions={true}
          className="bg-merah"
        />
      </div>
    </>
  );
}

export default DeliveryPages;
