import React, { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ButtonComponent from "../../components/Atom/Button";
import SubTitle from "../../components/Atom/SubTitle";
import FormAddMap from "../../components/Organism/FormAddMap";

const AddMapPages: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="border p-5 rounded-lg flex flex-col items-center space-y-1">
        <SubTitle subTitle="Tentukan Rute Pengiriman" className="mb-5" />
        {/* TODO: Move input to FormAddMap */}
        <FormAddMap ref={mapContainerRef}/>
        <ButtonComponent
          label="Ulangi"
          variant="undo"
          className="w-full h-10"
        />
      </div>
      <div
        className="col-span-2"
        ref={mapContainerRef}
        style={{
          height: "680px",
          width: "100%",
          borderRadius: "10px",
          zIndex: "0",
        }}
      />
    </div>
  );
};

export default AddMapPages;
