import React from "react";
import { useForm } from "react-hook-form";

const MyForm = ({ defaultValues, onSubmit }) => {
  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} placeholder="Nama" />
      <button type="submit">Simpan</button>
    </form>
  );
};

export default MyForm;
