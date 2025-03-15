import React, { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import SubTitle from "../../components/Atom/SubTitle";
import FormAddMap from "../../components/Organism/FormAddMap";

const AddMapPages: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="border p-5 rounded-lg flex flex-col items-center space-y-1 bg-secondary">
        <SubTitle subTitle="Rute Pengiriman" className="mb-5" />
        <FormAddMap ref={mapContainerRef} />
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
