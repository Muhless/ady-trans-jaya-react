import React from "react";
import { useParams } from "react-router-dom";
import SubTitle from "../../components/SubTitle";
import UserIconComponent from "../../components/UserIcon";

function DetailDriverPages() {
  const { id } = useParams();
  return (
    <>
      <div className="grid grid-cols-3">
        <div className="col-span-1 bg-secondary flex flex-col">
          <SubTitle
            subTitle="Detail Driver"
            className="p-3 flex justify-center"
          />
          <div className="items-center flex justify-center">
            <UserIconComponent className="size-40 rounded-full" />
          </div>
          <div className="p-5 space-y-5">
            <div className="flex space-x-3">
              <h1>Nama :</h1>
              <p>Muhta Nuryadi</p>
            </div>
            <div className="flex space-x-3">
              <h1>N0 Telepon :</h1>
              <p>08871165551</p>
            </div>
            <div className="flex space-x-3">
              <h1>Alamat :</h1>
              <p>Kp. Cangkudu Rt.06 Rw.01. Kab.Tangerang</p>
            </div>
            <div className="flex space-x-3">
              <h1>Keterangan :</h1>
              <p>Tersedia</p>
            </div>
          </div>
        </div>
        <div className="col-span-2">kolom 2</div>
      </div>
    </>
  );
}

export default DetailDriverPages;
