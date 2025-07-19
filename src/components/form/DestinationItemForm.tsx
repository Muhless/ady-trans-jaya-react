import React, { useState } from "react";
import { InputComponent } from "../input/Input";
import ButtonComponent from "../button/Index";
import SubTitle from "../SubTitle";
import SelectComponent from "../input/Select";
import { toast } from "sonner";

interface Item {
  item_name: string;
  quantity: number;
  unit: string;
  weight: number;
}

const DestinationItemForm = () => {
  const [form, setForm] = useState({
    item_name: "",
    quantity: "",
    unit: "",
    weight: "",
  });

  const [items, setItems] = useState<Item[]>([]);

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (!form.item_name.trim()) {
      toast.error("Nama barang harus diisi!");
      return;
    }

    if (!form.quantity || Number(form.quantity) <= 0) {
      toast.error("Silahkan tentukan jumlah barang terlebih dahulu!");
      return;
    }

    if (!form.unit.trim()) {
      toast.error("Silahkan pilih jenis satuan barang terlebih dahulu!");
      return;
    }

    if (!form.weight || Number(form.weight) <= 0) {
      toast.error("Berat barang harus diisi");
      return;
    }

    const newItem: Item = {
      item_name: form.item_name,
      quantity: Number(form.quantity),
      unit: form.unit,
      weight: Number(form.weight),
    };

    setItems((prev) => [...prev, newItem]);
    console.log("Item ditambahkan:", newItem);
    toast.success("Barang berhasil ditambahkan");
    setForm({
      item_name: "",
      quantity: "",
      unit: "",
      weight: "",
    });
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <h1 className="font-medium">Barang</h1>
      <hr />
      <div className="flex flex-col space-y-4">
        <InputComponent
          label="Nama Barang"
          placeholder="Masukkan nama barang"
          value={form.item_name}
          onChange={(e) => handleChange("item_name", e.target.value)}
        />

        <InputComponent
          label="Jumlah"
          type="number"
          placeholder="0"
          value={form.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
        />

        <SelectComponent
          label="Unit"
          placeholder="Pilih jenis satuan barang"
          value={form.unit}
          onChange={(e) => handleChange("unit", e.target.value)}
          options={[
            { label: "Pcs", value: "pcs" },
            { label: "Box", value: "box" },
            { label: "Unit", value: "unit" },
            { label: "Buah", value: "buah" },
            { label: "Dus", value: "dus" },
            { label: "Liter", value: "liter" },
            { label: "Meter", value: "meter" },
            { label: "Set", value: "set" },
            { label: "Ekor", value: "ekor" },
            { label: "Lainnya", value: "lainnya" },
          ]}
        />

        <InputComponent
          label="Berat (kg)"
          type="number"
          placeholder="0"
          value={form.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
        />

        <ButtonComponent
          label="Tambah Barang"
          variant="add"
          className="w-full"
          onClick={handleAdd}
        />
      </div>

      {items.length > 0 && (
        <div className="mt-6">
          <div className="mb-3">
            <h2 className="font-medium mb-3">
              Daftar Barang - ({items.length} item)
            </h2>
            <hr />
          </div>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg px-3 py-2 bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium">{item.item_name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} {item.unit} • {item.weight} kg
                    </p>
                  </div>
                  <ButtonComponent
                    variant="delete"
                    className="text-xs ml-2"
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DestinationItemForm;
