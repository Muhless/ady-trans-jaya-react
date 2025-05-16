import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/card/ProfileCard";
import SearchInput from "../../components/input/Search";
import Title from "../../components/Title";
import ButtonComponent from "../../components/button/Index";
import Modal from "../../components/modal/Modal";
import useNavigationHooks from "../../hooks/useNavigation";
import Spinner from "../../components/Spinner";
import {
  addDriver,
  deleteDriver,
  searchDriver,
  fetchDrivers,
} from "../../api/driver";
import DriverForm from "../../components/form/DriverForm";
import { getFullImageUrl } from "../../../utils/imageHelper";

interface Driver {
  id: number;
  name: string;
  phone: string;
  address: string;
  photo?: string;
  status?: string;
}

function DriverPages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { goToDriverDetails } = useNavigationHooks();

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const data = await fetchDrivers();
        if (!Array.isArray(data)) {
          throw new Error("Gagal mengambil data pengemudi");
        }
        setDrivers(data);
      } catch (err: any) {
        setError(
          err.message || "terjadi kesalahan saat mengambil data pengemudi"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDriver();
  }, []);

  const handleSubmit = async (data: Record<string, any>) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    if (data.photo && data.photo.length > 0) {
      formData.append("photo", data.photo[0]);
    }

    try {
      const newDriver = await addDriver(formData);
      setDrivers((prev) => [...prev, newDriver]);
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Gagal menyimpan data:", error);
      setError(error.message || "Gagal menyimpan data pengemudi");
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    try {
      const results = await searchDriver(value);
      setDrivers(results);
    } catch (error) {
      console.error("Gagal mencari pengemudi:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

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
        <SearchInput placeholder="pengemudi..." onChange={handleSearch} />
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
              imageUrl={getFullImageUrl(driver.photo)}
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
        title="Pengemudi"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <DriverForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}

export default DriverPages;
