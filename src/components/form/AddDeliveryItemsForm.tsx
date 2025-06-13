import React from "react";
import ButtonComponent from "../button/Index";
import TitleComponent from "../Title";
import { useDeliveryItemStore } from "@/stores/deliveryItemStore";
import useNavigationHooks from "@/hooks/useNavigation";
import { useDeliveryStore } from "@/stores/deliveryStore";

const AddDeliveryItemForm: React.FC = () => {
  const { goBack } = useNavigationHooks();

  const items = useDeliveryItemStore((state) => state.items);
  const addItems = useDeliveryItemStore((state) => state.addItems);
  const resetItems = useDeliveryItemStore((state) => state.resetItems);

  const handleChange = (
    index: number,
    field: "item_name" | "quantity" | "weight",
    value: string
  ) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    addItems(updatedItems);
  };

  const handleAddItem = () => {
    const newItems = [...items, { item_name: "", quantity: "", weight: "" }];
    addItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    addItems(updatedItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Tambahkan minimal 1 barang terlebih dahulu.");
      return;
    }

    console.log("Items yang akan dikirim:", items);

    useDeliveryStore
      .getState()
      .setDelivery({ items: items, total_item: items.length });

    goBack();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full p-5">
      <TitleComponent title="Daftar Barang" />
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-4 gap-3 items-center">
          <input
            type="text"
            placeholder="Nama Barang"
            value={item.item_name}
            onChange={(e) => handleChange(index, "item_name", e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Jumlah"
            value={item.quantity}
            onChange={(e) => handleChange(index, "quantity", e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Berat (kg)"
            value={item.weight}
            onChange={(e) => handleChange(index, "weight", e.target.value)}
            className="border p-2 rounded"
          />
          <ButtonComponent
            variant="delete"
            type="button"
            onClick={() => handleRemoveItem(index)}
          />
        </div>
      ))}
      <div className="flex justify-end gap-2">
        <ButtonComponent
          label="Tambah Barang"
          variant="add"
          type="button"
          onClick={handleAddItem}
          className="w-52"
        />
        <ButtonComponent
          label="Simpan"
          type="submit"
          variant="save"
          className="w-52"
        />
      </div>
    </form>
  );
};

export default AddDeliveryItemForm;
