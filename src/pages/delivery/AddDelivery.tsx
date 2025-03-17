import React, { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import AddDeliveryForm from "../../components/Organism/FormAddDelivery";

function AddDeliveryPages() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-1">
        <AddDeliveryForm />
      </div>
      <div className="col-span-2">
        <div
          className="col-span-2"
          ref={mapContainerRef}
          style={{
            height: "680px",
            width: "100%",
            borderRadius: "10px",
            zIndex: "0",
          }}
        ></div>
      </div>
    </div>
  );
}

export default AddDeliveryPages;
