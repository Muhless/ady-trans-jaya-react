import React, { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import FormAddDelivery from "../../components/form/FormAddDelivery";

const AddDeliveryPages: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="grid grid-cols-4 gap-5">
      <div className="col-span-2">
        <FormAddDelivery ref={mapContainerRef} />
      </div>
      <div className="col-span-2">
        <div
          ref={mapContainerRef}
          style={{
            height: "700px",
            width: "100%",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        />
      </div>
    </div>
  );
};

export default AddDeliveryPages;
