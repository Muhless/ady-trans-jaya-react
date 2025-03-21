import React, { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import FormAddMap from "../../components/organism/FormAddDelivery";

const AddMapPages: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-1">
        <FormAddMap ref={mapContainerRef} />
      </div>
      <div className="col-span-2">
        <div
          ref={mapContainerRef}
          style={{
            height: "650px",
            width: "100%",
            borderRadius: "10px",
            zIndex: "9999",
          }}
        />
      </div>
    </div>
  );
};

export default AddMapPages;
