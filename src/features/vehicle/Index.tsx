import React, { useEffect, useState } from "react";
import SearchInput from "../../components/input/Search";
import Title from "../../components/Title";
import { VehicleTypeComponent } from "../../components/button/CarType";
import ButtonComponent from "../../components/button/Index";
import Modal from "../../components/modal/Modal";
import VehicleCard from "../../components/card/CarCard";
import { API_BASE_URL } from "../../apiConfig";
import { addVehicle, deleteVehicle, fetchVehicles } from "../../api/vehicle";
import Spinner from "../../components/Spinner";

const vehicleTypes = ["Semua", "Pick up", "CDE", "CDD", "Fuso", "Wingbox"];

const modalInput = [
  { name: "name", label: "Nama Kendaraan", type: "text" },
  { name: "license_plat", label: "Nomor Plat", type: "text" },
  { name: "type", label: "Tipe", type: "select", options: vehicleTypes },
  { name: "capacity", label: "Kapasitas", type: "text" },
  { name: "rate_per_km", label: "Harga per Kilometer", type: "number" },
];

export interface Vehicles {
  id: number;
  name: string;
  license_plate: string;
  type: string;
  capacity: string;
  rate_per_km: number;
  status: string;
  onDelete: (id: number) => void;
}

function VehiclePages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicles[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    // const rate = defaultRates[data.type] || parseFloat(data.rate_per_km) || 0;
    const transformed = {
      ...data,
      type: data.type.toLowerCase(),
      status: data.status || "tersedia",
      rate_per_km: parseFloat(data.rate_per_km) || 0,
      // rate_per_km: rate,
    };

    if (isNaN(transformed.rate_per_km)) {
      setError("Harga harus berupa angka yang valid.");
      return;
    }

    try {
      data.rate_per_km = parseFloat(data.rate_per_km);
      const newVehicle = await addVehicle(transformed);
      setVehicle([...vehicle, newVehicle]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      setError(error.message);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
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
          onClick={() => setIsModalOpen(true)}
        />
        <VehicleTypeComponent vehicleTypes={vehicleTypes} />
        <SearchInput placeholder="kendaraan" />
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center">{error}</div>
      ) : (
        <>
          {Array.isArray(vehicle) && vehicle.length > 0 ? (
            <div className="grid grid-cols-2 gap-5">
              {vehicle.map((vehicle) => (
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
                />
              ))}
            </div>
          ) : (
            <div>Tidak ada kendaraan tersedia</div>
          )}
        </>
      )}

      <Modal
        title="Kendaraan"
        mode="add"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fields={modalInput}
        onSubmit={handleSubmitVehicle}
      />
    </div>
  );
}

export default VehiclePages;
