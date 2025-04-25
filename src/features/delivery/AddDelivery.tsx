import React, { useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import FormAddDelivery from "../../components/form/FormSubmitAddDelivery";

const AddDeliveryPages: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="relative h-max w-full overflow-hidden">
      <div
        className="absolute z-10 top-0 rounded-md right-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out"
        style={{
          width: "500px",
          transform: isFormVisible ? "translateX(0)" : "translateX(100%)",
          overflowY: "auto",
        }}
      >
        <FormAddDelivery ref={mapContainerRef} />
      </div>

      <button
        onClick={toggleForm}
        className={`absolute z-20 top-4 bg-white p-2 rounded-full shadow-md transition-all duration-300 ${
          isFormVisible ? "right-4" : "right-4"
        }`}
        aria-label={isFormVisible ? "Hide form" : "Show form"}
      >
        {isFormVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        )}
      </button>

      <div
        ref={mapContainerRef}
        className="absolute z-0 w-full"
        style={{
          height: "700px",
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
};

export default AddDeliveryPages;
