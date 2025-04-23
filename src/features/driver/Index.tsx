import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/card/ProfileCard";
import SearchInput from "../../components/input/Search";
import Title from "../../components/Title";
import ButtonComponent from "../../components/button/Index";
import Modal from "../../components/modal/Modal";
import useNavigationHooks from "../../hooks/useNavigation";

const modalInput = [
  { name: "name", label: "Nama", type: "text" },
  { name: "phone", label: "Nomor Telepon", type: "number" },
  { name: "address", label: "Alamat", type: "textarea" },
];

function DriverPages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [error, setError] = useState("");
  const { goToDriverDetails } = useNavigationHooks();

  const fetchDrivers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/driver");
      const json = await response.json();
      const data = Array.isArray(json.data) ? json.data : [];
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
    if (!data.status) {
      data.status = "tersedia";
    }

    if (!data.phone) {
      alert("Nomor telepon tidak boleh kosong");
      return;
    }

    // const phoneRegex = /^[0-9]{10,15}$/;
    // if (!phoneRegex.test(data.phone)) {
    //   alert("Nomor telepon tidak valid");
    //   return;
    // }

    try {
      const response = await fetch("http://localhost:8080/api/driver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Gagal menyimpan data");
      }

      const result = await response.json();
      console.log("Data berhasil disimpan", result);
      setIsModalOpen(false);
      setError("");
      fetchDrivers();
    } catch (error) {
      console.error("Terjadi kesalahan", error);
      setError("Gagal menyimpan data, coba lagi.");
    }
  };

  return (
    <div>
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
        {drivers.length > 0 ? (
          drivers.map((driver) => (
            <ProfileCard
              key={driver.id}
              name={driver.name}
              phone={driver.phone}
              address={driver.address}
              status={driver.status}
              onClick={goToDriverDetails(driver.id)}
            />
          ))
        ) : (
          <div className="col-start-2 flex justify-center">
            <h1>Belum ada data</h1>
          </div>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Modal
        title="Driver"
        mode="add"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fields={modalInput}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default DriverPages;
