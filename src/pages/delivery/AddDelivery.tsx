import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Title from "../../components/Atom/Title";
import FormComponent from "../../components/Organism/Form";

function AddDeliveryPages() {
  return (
    <>
      <Title title={"Tambah Pengiriman"} />
      <FormComponent />
      <div className="col-span-2"></div>
    </>
  );
}

export default AddDeliveryPages;
