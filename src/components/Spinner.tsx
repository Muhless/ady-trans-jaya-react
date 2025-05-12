import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-ping" />
    </div>
  );
};

export default Spinner;
