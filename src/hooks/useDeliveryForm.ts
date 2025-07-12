import { useState } from "react";

export const useDeliveryForm = () => {
  const [formData, setFormData] = useState({
    pickup_address: "",
    destinations: [
      {
        address: "",
        lat: null,
        lng: null,
        sequence: 1,
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDestinationChange = (index, field, value) => {
    const updated = [...formData.destinations];
    updated[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      destinations: updated,
    }));
  };

  const handleAddDestination = () => {
    const newDest = {
      address: "",
      lat: null,
      lng: null,
      sequence: formData.destinations.length + 1,
    };
    setFormData((prev) => ({
      ...prev,
      destinations: [...prev.destinations, newDest],
    }));
  };

  const handleRemoveDestination = (index) => {
    const filtered = formData.destinations.filter((_, i) => i !== index);
    const reSequenced = filtered.map((dest, i) => ({
      ...dest,
      sequence: i + 1,
    }));
    setFormData((prev) => ({
      ...prev,
      destinations: reSequenced,
    }));
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleDestinationChange,
    handleAddDestination,
    handleRemoveDestination,
  };
};
