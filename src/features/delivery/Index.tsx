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
  const { goToDetailDelivery } = useNavigationHooks();

  return (
    <div>
      <Title title={"Pengiriman"} />
      <div className="flex justify-end mb-5">
        <SearchInput placeholder={"pengiriman"} />
      </div>

        <TableComponent
          data={matches}
          onRowClick={goToDetailDelivery}
          showActions={true}
        />
    </div>
  );
}

export default DeliveryPages;
