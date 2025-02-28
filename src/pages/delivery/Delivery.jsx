import { Ellipsis } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import DeliveryCard from "../../components/card/DeliveryCard";
import SearchInput from "../../components/Search";
import Title from "../../components/Title";
import Table from "../../components/Table";
import AddButton from "../../components/ButtonAdd";

function DeliveryPages() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Title title={"Pengiriman"} />
      <div className="grid grid-cols-3 gap-3">
        <DeliveryCard className={"bg-merah"} />
        <DeliveryCard className={"bg-kuning"} />
        <DeliveryCard className={"bg-biru"} />
      </div>
      <div className="items-center justify-between my-5">
          <h1 className="text-text font-bold text-xl mb-5">
            Menunggu Persetujuan
          </h1>
        <div className="flex flex-row justify-between">
          <AddButton name={'Pengiriman'}/>
        <SearchInput />
        </div>
      </div>
      <div className="col-span-3">
        <Table />
      </div>
    </>
  );
}

export default DeliveryPages;
