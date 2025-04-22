import React, { useEffect, useState } from "react";
import SearchInput from "../../components/input/Search";
import Title from "../../components/Title";
import CarCard from "../../components/card/CarCard";
import { CarTypeComponent } from "../../components/button/CarType";
import ButtonComponent from "../../components/button/Index";
import ModalAddCar from "../../components/modal/ModalAddCar";
import Modal from "../../components/modal/Modal";

const carTypes = ["Semua", "Pick up", "CDE", "CDD", "fuso", "wingbox"];

const modalInput = [
  { name: "name", label: "Nama Kendaraan", type: "text" },
  { name: "license_plat", label: "Nomor Plat", type: "text" },
  { name: "type", label: "Tipe", type: "select", options: carTypes },
  { name: "price", label: "Harga", type: "number" },
];

interface Car {
  id: number;
  name: string;
  license_plat: string;
  type: string;
  price: number;
  status: string;
}

function VehiclePages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cars");
        if (!response.ok) {
          throw new Error("Gagal mengambil data mobil");
        }
        const data = await response.json();
        console.log("Respon API:", data);
        if (!Array.isArray(data.message)) {
          throw new Error("Respon API tidak sesuai ekspektasi");
        }
        setCars(data.message);
      } catch (err: any) {
        setError(err.message || "terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleSubmitVehicle = async (data: Record<string, any>) => {
    const transformed = {
      ...data,
      type: data.type.toLoweCase(),
    };

    if (!data.status) {
      data.status = "tersedia";
    }

    try {
      data.price = parseFloat(data.price);
      const response = await fetch("http://localhost:8080/api/cars", {
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
      const newCar = result.data;
      console.log("Data berhasil disimpan", newCar);
      setCars([...cars, newCar]);
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
        <CarTypeComponent carTypes={carTypes} />
        <SearchInput placeholder="kendaraan" />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          {Array.isArray(cars) && cars.length > 0 ? (
            <div className="space-y-3">
              {cars.map((car) => (
                <CarCard
                  key={car.id}
                  name={car.name}
                  license_plat={car.license_plat}
                  type={car.type}
                  price={car.price}
                  status={car.status}
                />
              ))}
            </div>
          ) : (
            <div>Tidak ada kendaraan tersedia</div>
          )}
        </>
      )}

      <Modal
        title="Customer"
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
