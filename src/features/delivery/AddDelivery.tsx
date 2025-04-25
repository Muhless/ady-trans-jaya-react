import React, { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import FormAddDelivery from "../../components/form/FormAddDelivery";
import { useMapboxHook } from "../../hooks/useMapbox";

const AddDeliveryPages: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // useMapboxHook(mapContainerRef);

  return (
    <div>
      <div className="absolute z-10 flex justify-end top-0 left-0 w-full h-full overflow-auto">
        <FormAddDelivery ref={mapContainerRef} />
      </div>
      <div
        ref={mapContainerRef}
        className="absolute z-0"
        style={{
          height: "700px",
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default AddDeliveryPages;
