import React, { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import FormAddDelivery from "../../components/form/FormAddDelivery";

const AddDeliveryFormPages: React.FC = () => {
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
            height: "700px",
            width: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default AddDeliveryFormPages;
