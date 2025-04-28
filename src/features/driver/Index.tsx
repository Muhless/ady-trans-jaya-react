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
  // { name: "photo", label: "Foto", type: "image" },
];

function DriverPages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { goToDriverDetails } = useNavigationHooks();

  const fetchDrivers = async (query = "") => {
    try {
      let url = "http://localhost:8080/api/driver";
      if (query) {
        url = `${url}?search=${encodeURIComponent(query)}`;
      }

      const response = await fetch(url);
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchDrivers(query);
  };

  const handleSubmit = async (formValues: Record<string, any>) => {
    try {
      setError("");

      if (!formValues.status) {
        formValues.status = "tersedia";
      }

      if (!formValues.phone) {
        setError("Nomor telepon tidak boleh kosong");
        return;
      }

      const response = await fetch("http://localhost:8080/api/driver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menyimpan data");
      }

      console.log("Data berhasil disimpan", result);
      setIsModalOpen(false);
      setError("");
      fetchDrivers(searchQuery);
    } catch (error: any) {
      console.error("Terjadi kesalahan", error);
      setError(error.message || "Gagal menyimpan data, coba lagi.");

      if (error.message.includes("telepon sudah terdaftar")) {
        setError("Nomor telepon sudah terdaftar. Gunakan nomor telepon lain.");
      }
    }
  };

  return (
    <div>
      <Title title={"Pengemudi"} />
      <div className="flex justify-between mb-5">
        <ButtonComponent
          label="Tambah Pengemudi"
          variant="add"
          className="w-48"
          onClick={() => {
            setError("");
            setIsModalOpen(true);
          }}
        />
        <SearchInput
          placeholder="pengemudi..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        {drivers.length > 0 ? (
          drivers.map((driver) => (
            <ProfileCard
              key={driver.id}
              name={driver.name || "Tidak ada nama"}
              phone={driver.phone || "Tidak ada nomor"}
              address={driver.address || "Tidak ada alamat"}
              status={driver.status || "tidak diketahui"}
              imageUrl={driver.photo || ""}
              onClick={goToDriverDetails(driver.id)}
            />
          ))
        ) : (
          <div className="col-span-full flex justify-center py-8">
            <h1 className="text-lg text-gray-500">Belum ada data driver</h1>
          </div>
        )}
      </div>

      <Modal
        title="Driver"
        mode="add"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setError("");
        }}
        fields={modalInput}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default DriverPages;
