import React, { useState } from "react";

export const useForm = () => {
  const [address, setAddress] = useState<string>("");
  const [endAddress, setEndAddress] = useState<string>("");

  const [formData, setFormData] = useState({
    loadType: "",
    load: "",
    quantity: "",
    weight: "",
    unit: "",
    driver: "",
    vehicle: "",
    deliveryDate: null as Date | null,
    deliveryDeadlineDate: null as Date | null,
    total: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      pickup_location: address,
      destination: endAddress,
    };
    console.log("Form Data:", finalData);
  };

  return {
    handleChange,
    handleChangeSelect,
    handleSubmit,
    formData,
    address,
    setAddress,
    endAddress,
    setEndAddress,
  };
};
