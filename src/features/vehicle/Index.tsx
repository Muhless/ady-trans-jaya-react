import React, { useEffect, useState } from "react";
import SearchInput from "../../components/input/Search";
import Title from "../../components/Title";
import { VehicleTypeComponent } from "../../components/button/CarType";
import ButtonComponent from "../../components/button/Index";
import Modal from "../../components/modal/Modal";
import VehicleCard from "../../components/card/CarCard";

const vehicleTypes = ["Semua", "Pick up", "CDE", "CDD", "Fuso", "Wingbox"];

const modalInput = [
  { name: "name", label: "Nama Kendaraan", type: "text" },
  { name: "license_plat", label: "Nomor Plat", type: "text" },
  { name: "type", label: "Tipe", type: "select", options: vehicleTypes },
  { name: "capacity", label: "Kapasitas", type: "text" },
  { name: "rate_per_km", label: "Harga per Kilometer", type: "number" },
];

// const defaultRates: { [key: string]: number } = {
//   "Pick up": 5000,
//   CDE: 6000,
//   CDD: 8000,
//   Fuso: 10000,
//   Wingbox: 12000,
// };

interface Vehicles {
  id: number;
  name: string;
  license_plate: string;
  type: string;
  capacity: string;
  rate_per_km: number;
  status: string;
}

function VehiclePages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicles[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const apiUrl = "http://202.10.41.13:8080/api/vehicle";
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Gagal mengambil data kendaraan");
        }
        const data = await response.json();
        console.log("Respon API:", data);
        if (!Array.isArray(data.data)) {
          throw new Error("Respon API tidak sesuai ekspektasi");
        }

        setVehicle(data.data);
      } catch (err: any) {
        setError(err.data || "terjadi kesalahan");
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
      const apiUrl = "http://202.10.41.13:8080/api/vehicle";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformed),
      });
      if (!response.ok) {
        throw new Error("Gagal menambahkan data kendaraan");
      }
      const result = await response.json();
      const newVehicle = result.data;
      console.log("Data berhasil disimpan", newVehicle);
      setVehicle([...vehicle, newVehicle]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      setError(error.message);
    }
  };

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
                  name={vehicle.name}
                  type={vehicle.type}
                  license_plate={vehicle.license_plate}
                  capacity={vehicle.capacity}
                  rate_per_km={vehicle.rate_per_km}
                  status={vehicle.status}
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
