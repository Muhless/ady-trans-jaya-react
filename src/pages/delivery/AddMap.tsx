import React, { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import FormAddMap from "../../components/Organism/FormAddDelivery";

const AddMapPages: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="grid grid-cols-3 gap-5 h-screen">
      <div className="col-span-1 h-screen overflow-auto">
        <FormAddMap ref={mapContainerRef} />
      </div>
      <div className="col-span-2">
        <div
          className="fixed"
          ref={mapContainerRef}
          style={{
            height: "710px",
            width: "100%",
            borderRadius: "10px",
            zIndex: "0",
          }}
        />
      </div>
    </div>
  );
};

export default AddMapPages;
