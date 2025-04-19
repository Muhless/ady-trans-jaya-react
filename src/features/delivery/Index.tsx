import SearchInput from "../../components/input/Search.tsx";
import SubTitle from "../../components/SubTitle.tsx";
import { useNavigate } from "react-router-dom";
import React from "react";
import Title from "../../components/Title.tsx";
import ButtonComponent from "../../components/button/Index.tsx";
import useNavigationHooks from "../../hooks/useNavigation.ts";
import SummaryCard from "../../components/card/SummaryCard.tsx";
import TableComponent from "../../components/table/index.tsx";
import Card from "../../components/card/index.tsx";

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
];

function DeliveryPages() {
  const { goToAddDelivery, goToDetailDelivery } = useNavigationHooks();

  return (
    <>
      <Title title={"Pengiriman"} />
      <div className="grid grid-cols-4 gap-3 mb-10">
        <SummaryCard
          value={13}
          textClassName="text-[#3884f2]"
          desc="Kendaraan Tersedia"
        />
        <SummaryCard
          value={8}
          textClassName="text-[#ee453e]"
          desc="Pengemudi Tersedia"
        />
        <SummaryCard
          value={10}
          textClassName="text-[#e9a60b]"
          desc="Pelanggan Setia"
        />
        <SummaryCard
          textClassName="text-[#2ebf62]"
          value={5}
          desc="Pengiriman Berlangsung"
        />
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
        <Card>
          <TableComponent
            data={matches}
            onRowClick={goToDetailDelivery}
            showActions={true}
          />
        </Card>
      </div>
    </>
  );
}

export default DeliveryPages;
