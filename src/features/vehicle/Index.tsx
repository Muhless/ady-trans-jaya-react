import React, { useEffect, useState } from "react";
import SearchInput from "../../components/input/Search";
import Title from "../../components/Title";
import CarCard from "../../components/card/CarCard";
import { VehicleTypeComponent } from "../../components/button/CarType";
import ButtonComponent from "../../components/button/Index";
import ModalAddCar from "../../components/modal/ModalAddCar";
import Modal from "../../components/modal/Modal";

const vehicleTypes = ["Semua", "Pick up", "CDE", "CDD", "fuso", "wingbox"];

const modalInput = [
  { name: "name", label: "Nama Kendaraan", type: "text" },
  { name: "license_plat", label: "Nomor Plat", type: "text" },
  { name: "type", label: "Tipe", type: "select", options: vehicleTypes },
  { name: "price", label: "Harga", type: "number" },
];

interface Vehicles {
  id: number;
  name: string;
  license_plat: string;
  type: string;
  price: number;
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
        const response = await fetch("http://localhost:8080/api/vehicle");
        if (!response.ok) {
          throw new Error("Gagal mengambil data kendaraan");
        }
        const data = await response.json();
        console.log("Respon API:", data);
        if (!Array.isArray(data.message)) {
          throw new Error("Respon API tidak sesuai ekspektasi");
        }
        setVehicle(data.message);
      } catch (err: any) {
        setError(err.message || "terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, []);

  const handleSubmitVehicle = async (data: Record<string, any>) => {
    const transformed = {
      ...data,
      type: data.type.toLowerCase(),
    };

    if (!data.status) {
      data.status = "tersedia";
    }

    try {
      data.price = parseFloat(data.price);
      const response = await fetch("http://localhost:8080/api/vehicle", {
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
            <div className="space-y-3">
              {vehicle.map((vehicle) => (
                <CarCard
                  key={vehicle.id}
                  name={vehicle.name}
                  license_plat={vehicle.license_plat}
                  type={vehicle.type}
                  price={vehicle.price}
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
