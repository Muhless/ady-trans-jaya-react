import React from "react";
import ButtonComponent from "../button/Index";
import { DeliveryItem, useDeliveryItemStore } from "@/stores/deliveryItemStore";
import useNavigationHooks from "@/hooks/useNavigation";
import { useDeliveryStore } from "@/stores/deliveryStore";
import { toast } from "sonner";

const AddDeliveryItemForm: React.FC = () => {
  const { goBack } = useNavigationHooks();

  const items = useDeliveryItemStore((state) => state.items);
  const addItems = useDeliveryItemStore((state) => state.addItems);
  const resetDeliveryItems = useDeliveryItemStore(
    (state) => state.resetDeliveryItems
  );

  const handleChange = (
    index: number,
    field: keyof DeliveryItem,
    value: string
  ) => {
    const updatedItems = [...items];

    let parsedValue: string | number;

    if (field === "weight" || field === "quantity") {
      const numValue = Number(value);
      if (isNaN(numValue) || numValue < 0) {
        return;
      }
      parsedValue = Math.floor(numValue);
    } else {
      parsedValue = value;
    }

    updatedItems[index] = {
      ...updatedItems[index],
      [field]: parsedValue,
    };

    addItems(updatedItems);
  };

  const handleAddItem = () => {
    const newItems: DeliveryItem[] = [
      ...items,
      { item_name: "", quantity: 0, unit: "", weight: 0 },
    ];
    addItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    addItems(updatedItems);
  };

  const handleReset = () => {
    resetDeliveryItems();
    toast.success("Data barang berhasil direset");
  };

  const validateItems = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (items.length === 0) {
      errors.push("Tambahkan minimal 1 barang terlebih dahulu.");
      return { isValid: false, errors };
    }

    items.forEach((item, index) => {
      if (!item.item_name.trim()) {
        errors.push(`Nama barang item ke-${index + 1} tidak boleh kosong.`);
      }
      if (item.quantity <= 0) {
        errors.push(`Jumlah item ke-${index + 1} harus lebih dari 0.`);
      }
      if (item.weight <= 0) {
        errors.push(`Berat item ke-${index + 1} harus lebih dari 0.`);
      }
    });

    return { isValid: errors.length === 0, errors };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateItems();

    if (!validation.isValid) {
      alert(validation.errors[0]);
      return;
    }

    useDeliveryStore
      .getState()
      .setDelivery({ items: items, total_item: items.length });

    goBack();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-md shadow-sm"
    >
      <div className="grid grid-cols-5 gap-4 pb-3 border-b border-gray-200 font-semibold text-gray-700">
        <div>Nama Barang</div>
        <div>Jumlah</div>
        <div>Satuan</div>
        <div>Berat (kg)</div>
      </div>

      <div>
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Belum ada barang yang ditambahkan.</p>
            <p>Klik "Tambah Barang" untuk menambahkan barang baru.</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 items-center p-4 bg-gray-50 rounded-md"
            >
              <input
                type="text"
                placeholder="Masukkan nama barang"
                value={item.item_name}
                onChange={(e) =>
                  handleChange(index, "item_name", e.target.value)
                }
                className="border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="number"
                placeholder="Jumlah"
                value={item.quantity || ""}
                onChange={(e) =>
                  handleChange(index, "quantity", e.target.value)
                }
                className="border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <select
                value={item.unit}
                onChange={(e) => handleChange(index, "unit", e.target.value)}
                className="border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Pilih satuan</option>
                <option value="box">Box</option>
                <option value="buah">Buah</option>
                <option value="dus">Dus</option>
                <option value="liter">Liter</option>
                <option value="meter">Meter</option>
                <option value="pcs">Pcs</option>
                <option value="roll">Roll</option>
                <option value="set">Set</option>
                <option value="unit">Unit</option>
                <option value="ekor">Ekor</option>
                <option value="lainnya">Lainnya</option>
              </select>

              <input
                type="number"
                placeholder="Berat dalam kg"
                value={item.weight || ""}
                onChange={(e) => handleChange(index, "weight", e.target.value)}
                className="border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min="1"
                step="1"
              />
              <ButtonComponent
                variant="delete"
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="p-2"
              />
            </div>
          ))
        )}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <ButtonComponent
          label="Tambah Barang"
          variant="add"
          type="button"
          onClick={handleAddItem}
          className="w-full sm:w-auto"
        />
      </div>

      {items.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-blue-800">
              Total Barang: {items.length} item
            </span>
            <span className="font-medium text-blue-800">
              Total Berat:{" "}
              {items.reduce((total, item) => total + item.weight, 0)} kg
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
        <div className="flex gap-3 sm:ml-auto">
          <ButtonComponent
            label="Kembali"
            variant="back"
            type="button"
            onClick={goBack}
            className="w-full sm:w-32"
          />
          <ButtonComponent
            label="Ulangi"
            variant="undo"
            type="button"
            onClick={handleReset}
            className="w-full sm:w-32"
            disabled={items.length === 0}
          />
          <ButtonComponent
            label="Simpan"
            type="submit"
            variant="save"
            className="w-full sm:w-32"
            disabled={items.length === 0}
          />
        </div>
      </div>
    </form>
  );
};

export default AddDeliveryItemForm;
