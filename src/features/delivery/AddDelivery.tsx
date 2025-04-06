import React, { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import FormAddDelivery from "../../components/maps/FormAddDelivery";

const AddDeliveryPages: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-1">
        <FormAddDelivery ref={mapContainerRef} />
      </div>
      <div className="col-span-2">
        <div
          ref={mapContainerRef}
          style={{
            height: "720px",
            width: "100%",
            borderRadius: "5px",
            zIndex: "9999",
          }}
        />
      </div>
    </div>
  );
};

export default AddDeliveryPages;
