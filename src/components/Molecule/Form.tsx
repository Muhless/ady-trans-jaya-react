import React from "react";

const Form = ({ label, type = "text", placeholder = "" }) => {
  return (
    <div className="flex flex-col w-full space-y-1 mb-5">
      <label>{label}</label>
      <input
        type={type}
        className="bg-secondary p-2 rounded-lg"
        placeholder={`Masukkan ${placeholder}`}
      />
    </div>
  );
};



export default Form;
