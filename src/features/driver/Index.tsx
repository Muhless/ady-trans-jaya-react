import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/card/ProfileCard";
import SearchInput from "../../components/input/Search";
import Title from "../../components/Title";
import ButtonComponent from "../../components/button/Index";
import Modal from "../../components/Modal";
import Card from "../../components/card";

const modalInput = [
  { name: "name", label: "Nama", type: "text" },
  { name: "phone", label: "Nomor Telepon", type: "number" },
  { name: "address", label: "Alamat", type: "textarea" },
  { name: "photo", label: "Foto", type: "file" },
];

function DriverPages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drivers, setDrivers] = useState([]);

  const fetchDrivers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/driver");
      const json = await response.json();

      const data = Array.isArray(json.message) ? json.message : [];
      setDrivers(data);
    } catch (err) {
      console.error("Gagal mengambil data driver:", err);
      setDrivers([]);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      const response = await fetch("http://localhost:8080/api/driver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Gagal menyimpan data");
      }
      const result = await response.json();
      console.log("Data berhasil disimpan", result);
      setIsModalOpen(false);
      fetchDrivers();
    } catch (error) {
      console.error("Terjadi kesalahan", error);
    }
  };

  return (
    <>
      <Title title={"Driver"} />
      <div className="flex justify-between mb-5">
        <ButtonComponent
          label="Tambah Driver"
          variant="add"
          className="w-48"
          onClick={() => setIsModalOpen(true)}
        />
        <SearchInput placeholder="driver" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {Array.isArray(drivers) && drivers.length > 0 ? (
          (drivers || []).map((driver: any) => (
            <ProfileCard
              key={driver.id}
              name={driver.name}
              phone={driver.phone}
              address={driver.address}
            />
          ))
        ) : (
          <Card className="col-start-2 flex justify-center h-32 items-center underline">
            <h1>Tidak ada data</h1>
          </Card>
        )}
      </div>
      <Modal
        title="Driver"
        mode="add"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fields={modalInput}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default DriverPages;
