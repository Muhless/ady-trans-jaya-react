import React, { useEffect, useState, useMemo } from "react";
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
import { toast } from "sonner";
import { useFilterHandlers } from "@/handlers/transactionHandlers";
import { useQuery } from "@tanstack/react-query";

const vehicleTypes = ["Semua", "Pick up", "CDE", "CDD", "Fuso"];

function VehiclePages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicles, setVehicle] = useState<Vehicles[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicles | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedType, setSelectedType] = useState("Semua");
  const { searchTerm, handleSearchChange } = useFilterHandlers();

  const {
    data: vehicleData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: fetchVehicles,
  });

  // Sync React Query data with local state
  useEffect(() => {
    if (vehicleData) {
      setVehicle(vehicleData);
    }
  }, [vehicleData]);

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
        toast.success("Data kendaraan berhasil diperbarui");
      } else {
        await addVehicle(transformed);
        toast.success("Data kendaraan berhasil ditambahkan");
      }

      // Refresh data dari server
      await refetch();

      // Reset modal state
      setIsModalOpen(false);
      setSelectedVehicle(null);
      setMode("add");
    } catch (error: any) {
      console.error("Gagal menyimpan data:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Terjadi kesalahan saat menyimpan data";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus kendaraan ini?")) return;

    try {
      await deleteVehicle(id);
      toast.success("Kendaraan berhasil dihapus");

      // Refresh data dari server
      await refetch();
    } catch (error: any) {
      console.error("Gagal hapus kendaraan:", error);
      const errorMessage = "Gagal menghapus kendaraan";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleAddVehicle = () => {
    setSelectedVehicle(null);
    setMode("add");
    setIsModalOpen(true);
  };

  const handleEdit = (vehicleId: number) => {
    const vehicleToEdit = vehicles.find((v) => v.id === vehicleId);
    if (vehicleToEdit) {
      setSelectedVehicle(vehicleToEdit);
      setMode("edit");
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
    setMode("add");
    setError(null);
  };

  useEffect(() => {
    if (mode === "edit" && selectedVehicle) {
      console.log("Mode changed to edit with vehicle:", selectedVehicle);
    } else {
      console.log("Mode changed to add");
    }
  }, [mode, selectedVehicle]);

  const typeFilteredVehicles = useMemo(() => {
    return selectedType === "Semua"
      ? vehicles
      : vehicles.filter(
          (v) => v.type.toLowerCase() === selectedType.toLowerCase()
        );
  }, [vehicles, selectedType]);

  const filteredVehicles = useMemo(() => {
    if (!searchTerm) return typeFilteredVehicles;

    const term = searchTerm.toLowerCase();

    return typeFilteredVehicles.filter((vehicle) => {
      return (
        vehicle.name?.toLowerCase().includes(term) ||
        vehicle.type?.toLowerCase().includes(term) ||
        vehicle.license_plate?.toLowerCase().includes(term) ||
        vehicle.status?.toLowerCase().includes(term) ||
        vehicle.capacity?.toString().includes(term) ||
        vehicle.rate_per_km?.toString().includes(term)
      );
    });
  }, [typeFilteredVehicles, searchTerm]);

  // Handle error state
  if (isError) {
    return (
      <div>
        <Title title="Kendaraan" />
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Gagal memuat data kendaraan. Silakan coba lagi.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Title title="Kendaraan" />
      <div className="flex justify-between items-center mb-5">
        <ButtonComponent
          label="Tambah Kendaraan"
          variant="add"
          className="w-48"
          onClick={handleAddVehicle}
        />
        <VehicleTypeComponent
          vehicleTypes={vehicleTypes}
          vehicles={vehicles}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <SearchInput
          placeholder="kendaraan"
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center">Loading...</div>
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
              {searchTerm || selectedType !== "Semua"
                ? "Tidak ada kendaraan yang sesuai dengan pencarian"
                : "Tidak ada kendaraan"}
            </div>
          )}
        </>
      )}

      <Modal
        title="Kendaraan"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={mode}
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
