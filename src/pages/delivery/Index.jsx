import React from "react";
import DeliveryCard from "../../components/card/DeliveryCard";
import SearchInput from "../../components/Search";
import Title from "../../components/Title";
import Table from "../../components/Table";
import AddButton from "../../components/ButtonAdd";
import SubTitle from "../../components/SubTitle";
import { useNavigate } from "react-router-dom";

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
    name: "ady",
    route: "Balaraja-Cangkudu",
    deadline: "18 oktober 2024 - 21 oktober 2024",
  },
  {
    name: "ady",
    route: "Balaraja-Cangkudu",
    deadline: "18 oktober 2024 - 21 oktober 2024",
  },
  {
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
    navigate('/delivery/add')
  }

  return (
    <>
      <Title title={"Pengiriman"} />
      <div className="grid grid-cols-3 gap-3">
        <DeliveryCard
          className={"bg-merah"}
          title={"Menunggu"}
          subTitle={"Persetujuan"}
        />
        <DeliveryCard
          className={"bg-kuning"}
          title={"Sedang"}
          subTitle={"Berlangsung"}
        />
        <DeliveryCard
          className={"bg-biru"}
          title={"Sudah"}
          subTitle={"Disetujui"}
        />
      </div>
      <div className="grid grid-cols-3 my-5 gap-5">
        <div className="col-span-2">
          <div className="items-center justify-between mb-5">
            <SubTitle SubTitle={"Sedang Berlangsung"} className={'mb-5 mt-3'} />
            <div className="flex flex-row justify-between">
              <AddButton name={"Pengiriman"} onClick={handleAddClick}/>
              <SearchInput placeholder={'pengiriman'}/>
            </div>
          </div>
          <Table
            data={matches}
            onRowClick={handleRowClick}
            showActions={true}
          />
        </div>
        <div className="col-span-1">
          <div className="bg-secondary w-full h-full">
            <SubTitle SubTitle={"Menunggu Persetujuan"} className={'p-3'}/>
            <Table data={onGoing} onRowClick={handleRowClick} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveryPages;
