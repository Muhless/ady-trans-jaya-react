import React, { useEffect, useState } from "react";
import SearchInput from "../../components/input/Search";
import Title from "../../components/Title";
import { VehicleTypeComponent } from "../../components/button/VehicleType";
import ButtonComponent from "../../components/button/Index";
import Modal from "../../components/modal/Modal";
import VehicleCard, { Vehicles } from "../../components/card/VehicleCard";
import {
  addVehicle,
  deleteVehicle,
  fetchVehicles,
  updateVehicle,
} from "../../api/vehicle";
import VehicleForm from "../../components/form/VehicleForm";

const vehicleTypes = ["Semua", "Pick up", "CDE", "CDD", "Fuso", "Wingbox"];

function VehiclePages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicles, setVehicle] = useState<Vehicles[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicles | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedType, setSelectedType] = useState("Semua");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await fetchVehicles();
        if (!Array.isArray(data)) {
          throw new Error("Gagal mengambil data kendaraan");
        }
        setVehicle(data);
      } catch (err: any) {
        setError(
          err.message || "terjadi kesalahan saat mengambil data kendaraan"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, []);

  const handleSubmitVehicle = async (data: Record<string, any>) => {
    try {
      const transformed = {
        ...data,
        type: data.type.toLowerCase(),
        status: data.status || "tersedia",
        rate_per_km: parseFloat(data.rate_per_km) || 0,
      };

      if (isNaN(transformed.rate_per_km)) {
        setError("Harga harus berupa angka yang valid.");
        return;
      }

      if (mode === "edit" && selectedVehicle) {
        await updateVehicle(selectedVehicle.id, transformed);

        const updatedVehicles = vehicles.map((v) => {
          if (v.id === selectedVehicle.id) {
            return {
              ...v,
              ...transformed,
            };
          }
          return v;
        });

        setVehicle(updatedVehicles);
      } else {
        const newVehicle = await addVehicle(transformed);
        setVehicle([...vehicles, newVehicle]);
      }

      setIsModalOpen(false);
      setSelectedVehicle(null);
      setMode("add");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Terjadi kesalahan saat menyimpan data"
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus kendaraan ini?")) return;

    try {
      await deleteVehicle(id);
      setVehicle((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Gagal hapus kendaraan:", error);
      setError("Gagal menghapus kendaraan");
    }
  };

  const handleEdit = (vehicleId: number) => {
    const vehicleToEdit = vehicles.find((v) => v.id === vehicleId);
    if (vehicleToEdit) {
      console.log("Vehicle to edit:", vehicleToEdit);
      setSelectedVehicle(vehicleToEdit);
      setMode("edit");
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (mode === "edit" && selectedVehicle) {
      console.log("Mode changed to edit with vehicle:", selectedVehicle);
    } else {
      console.log("Mode changed to add");
    }
  }, [mode, selectedVehicle]);

  const filteredVehicles =
    selectedType === "Semua"
      ? vehicles
      : vehicles.filter(
          (v) => v.type.toLowerCase() === selectedType.toLowerCase()
        );

  return (
    <div>
      <Title title="Kendaraan" />
      <div className="flex justify-between items-center mb-5">
        <ButtonComponent
          label="Tambah Kendaraan"
          variant="add"
          className="w-48"
          onClick={() => setIsModalOpen(true)}
        />
        <VehicleTypeComponent
          vehicleTypes={vehicleTypes}
          vehicles={vehicles}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <SearchInput placeholder="kendaraan" />
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center">{error}</div>
      ) : (
        <>
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-2 gap-5">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  id={vehicle.id}
                  name={vehicle.name}
                  type={vehicle.type}
                  license_plate={vehicle.license_plate}
                  capacity={vehicle.capacity}
                  rate_per_km={vehicle.rate_per_km}
                  status={vehicle.status}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center p-5 text-red-500 ">
              Tidak ada kendaraan
            </div>
          )}
        </>
      )}

      <Modal
        title="Kendaraan"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedVehicle(null);
          setMode("add");
        }}
      >
        <VehicleForm
          onSubmit={handleSubmitVehicle}
          defaultValues={selectedVehicle || {}}
          onReset={() => setSelectedVehicle(null)}
          mode={mode}
        />
      </Modal>
    </div>
  );
}

export default VehiclePages;
