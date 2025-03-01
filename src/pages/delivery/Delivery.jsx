import React, { useEffect, useRef, useState } from "react";
import DeliveryCard from "../../components/card/DeliveryCard";
import SearchInput from "../../components/Search";
import Title from "../../components/Title";
import Table from "../../components/Table";
import AddButton from "../../components/ButtonAdd";

function DeliveryPages() {
  return (
    <>
      <Title title={"Pengiriman"} />
      <div className="grid grid-cols-3 gap-3">
        <DeliveryCard className={"bg-merah"} title={"Menunggu"} subTitle={'Persetujuan'} />
        <DeliveryCard className={"bg-kuning"} title={"Sedang"} subTitle={'Berlangsung'}/>
        <DeliveryCard className={"bg-biru"} title={"Sudah"} subTitle={'Disetujui'}/>
      </div>
      <div className="items-center justify-between my-5">
        <h1 className="text-text font-bold text-xl mb-5">
          Menunggu Persetujuan
        </h1>
        <div className="flex flex-row justify-between">
          <AddButton name={"Pengiriman"} />
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
