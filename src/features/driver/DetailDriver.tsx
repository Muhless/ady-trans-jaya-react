import React from "react";
import { useParams } from "react-router-dom";

function DetailDriverPages() {
  const { id } = useParams();
  return (
    <>
      <div className="grid grid-cols-2 container mx-auto">
        <div className="bg-blue-400">kolom 1</div>
        <div className="bg-lime-400 h-screen">kolom 2</div>
      </div>
    </>
  );
}

export default DetailDriverPages;
