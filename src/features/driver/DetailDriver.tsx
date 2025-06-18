import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  User,
  MapPin,
  Calendar,
  Award,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import ButtonComponent from "../../components/button/Index";
import useNavigationHooks from "../../hooks/useNavigation";
import { API_BASE_URL } from "../../apiConfig";
import { formatDate } from "../../../utils/Formatters";
import UserIconComponent from "../../components/UserIcon";
import { getFullImageUrl } from "../../../utils/imageHelper";
import DeliveryHistoryCard from "../../components/card/DeliveryHistoryCard";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal/Modal";
import { addDriver, updateDriver } from "@/api/driver";
import { Driver, useDrivers } from "@/hooks/useDrivers";
import DriverForm, { DriverFormData } from "@/components/form/DriverForm";
import { toast } from "sonner";

interface DeliveryHistory {
  id: string;
  destination_address: string;
  delivery_date: string;
  delivery_status: string;
  load_type: string;
  load: string;
}

function DriverDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { goBack } = useNavigationHooks();
  const { drivers, setDrivers, loading, error, setError } = useDrivers();

  const fetchDriverDetails = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/driver/${id}`);
    if (!response.ok) {
      throw new Error("Gagal mengambil data driver");
    }
    const data = await response.json();
    return data.data;
  };

  const fetchDriverDeliveries = async (id: string) => {
    const response = await fetch(
      `${API_BASE_URL}/deliveries/search?driver_id=${id}`
    );
    if (!response.ok) {
      throw new Error("Gagal mengambil riwayat pengiriman");
    }
    const data = await response.json();
    return data.data;
  };

  const deleteDriver = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/driver/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus driver");
      }

      goBack();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menghapus driver.");
    }
  };

  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitEdit = async (formData: DriverFormData) => {
    if (!selectedDriver) return;

    try {
      const updatedDriver = await updateDriver(selectedDriver.id, formData);

      setDrivers((prev) =>
        prev.map((driver) =>
          driver.id === selectedDriver.id ? updatedDriver : driver
        )
      );
      setIsModalOpen(false);
      setSelectedDriver(null);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      const message =
        error.response?.data?.error ||
        error.message ||
        "Gagal memperbarui data pengemudi";
      setError(message);
      console.error("Gagal mengedit driver:", message);
      toast.error("Gagal mengubah data pengemudi");
    }
  };

  const handleEdit = () => {
    if (driver) {
      console.log("Driver to edit:", driver);
      setSelectedDriver(driver);
      setMode("edit");
      setIsModalOpen(true);
    }
  };

  const { data: driver } = useQuery<Driver, Error>({
    queryKey: ["driverDetails", id],
    queryFn: () => fetchDriverDetails(id!),
    enabled: !!id,
  });

  const {
    data: deliveries,
    isLoading: isLoadingDeliveries,
    isError: isErrorDeliveries,
  } = useQuery<DeliveryHistory[], Error>({
    queryKey: ["driverDeliveries", id],
    queryFn: () => fetchDriverDeliveries(id!),
  });

  const photoUrl = getFullImageUrl(driver?.photo);

  return (
    <div className="py-5">
      <div className="flex items-center mb-6">
        <button
          onClick={() => goBack()}
          className="mr-4 rounded-full hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Detail Pengemudi</h1>

        <div className="ml-auto flex space-x-2">
          <ButtonComponent
            label="Ubah"
            variant="edit"
            className="rounded-md w-32"
            onClick={handleEdit}
          />
          <ConfirmDialog
            trigger={
              <Button variant="destructive" className="w-32">
                <Trash2 /> Hapus
              </Button>
            }
            title="Hapus Data Pengemudi?"
            description="Yakin ingin menghapus data pengemudi ini?"
            confirmText="Ya, Hapus"
            cancelText="Batal"
            onConfirm={() => driver?.id && deleteDriver(driver.id.toString())}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 bg-white rounded-md border">
        <div className="col-span-1 p-10 border-r">
          <div className="overflow-hidden">
            <div className="text-center h-96">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={driver?.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <UserIconComponent className="w-full h-full" />
              )}
            </div>
          </div>
        </div>
        <div className="p-10 col-span-2">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-100">
                Informasi Driver
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nama Lengkap</p>
                  <p className="font-medium">{driver?.name}</p>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span
                    className={`inline-flex items-center px-5 py-1 rounded-md text-sm font-medium ${
                      driver?.status === "tersedia"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {driver?.status === "tersedia" ? (
                      <>
                        <CheckCircle size={16} className="mr-1" />
                        Tersedia
                      </>
                    ) : (
                      <>
                        <XCircle size={16} className="mr-1" /> Tidak Tersedia
                      </>
                    )}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nomor Telepon</p>
                  <p className="font-medium">{driver?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Terakhir Diperbarui
                  </p>
                  <p className="font-medium">
                    {driver?.updated_at ? formatDate(driver.updated_at) : "-"}
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-100">
                Alamat
              </h3>
              <p>{driver?.address}</p>
            </div>
            {/*  */}
            <div>
              <DeliveryHistoryCard
                deliveries={deliveries}
                isLoading={isLoadingDeliveries}
                isError={isErrorDeliveries}
              />
            </div>
          </div>
        </div>
        <Modal
          title="Pengemudi"
          isOpen={isModalOpen}
          width="w-[800px]"
          mode="edit"
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDriver(null);
          }}
        >
          <DriverForm
            onSubmit={handleSubmitEdit}
            defaultValues={selectedDriver || {}}
            onReset={() => setSelectedDriver(null)}
            mode={mode}
          />
        </Modal>
      </div>
    </div>
  );
}

export default DriverDetailPage;
