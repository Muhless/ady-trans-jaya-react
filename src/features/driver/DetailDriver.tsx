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
} from "lucide-react";
import ButtonComponent from "../../components/button/Index";
import useNavigationHooks from "../../hooks/useNavigation";
import { API_BASE_URL } from "../../apiConfig";
import { formatDate } from "../../../utils/Formatters";
import UserIconComponent from "../../components/UserIcon";
import { getFullImageUrl } from "../../../utils/imageHelper";

interface Driver {
  id: string;
  name: string;
  phone: string;
  address: string;
  status: string;
  photo?: string;
  created_at: string;
  updated_at: string;
}

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
  const [activeTab, setActiveTab] = useState<"profile" | "history">("profile");
  const { goBack } = useNavigationHooks();

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
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus data pengemudi ini?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/driver/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus driver");
      }

      alert("Driver berhasil dihapus.");
      goBack();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menghapus driver.");
    }
  };

  const {
    data: driver,
    isLoading: isLoadingDriver,
    isError: isErrorDriver,
    error: errorDriver,
  } = useQuery<Driver, Error>({
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
    enabled: !!id && activeTab === "history",
  });

  if (isLoadingDriver) {
    return (
      <div className="flex items-center justify-center bg-gray-50 h-max">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isErrorDriver) {
    return (
      <div className="flex items-center justify-center bg-gray-50 h-max">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <h3 className="font-bold mb-2">Error</h3>
          <p>{(errorDriver as Error).message}</p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            onClick={() => goBack()}
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

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
            // TODO: ADD handle to edit data
            // onClick={handleEdit}
          />
          <ButtonComponent
            label="Hapus"
            variant="delete"
            className="rounded-md w-32"
            onClick={() => driver?.id && deleteDriver(driver.id)}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 bg-white rounded-md border">
        <div className="col-span-1 p-10 border-r">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/70 p-6 text-center h-96">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={driver?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIconComponent className="w-full h-full" />
              )}
              <h2 className="mt-4 text-xl font-bold text-white">
                {driver?.name}
              </h2>
              <p className="text-primary-100">
                {driver?.id ? `ID: ${driver.id}` : ""}
              </p>
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
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                Riwayat Pengiriman
              </h3>
              {isErrorDeliveries && (
                <div className="bg-red-50 p-4 rounded-lg text-red-600">
                  Gagal memuat riwayat pengiriman
                </div>
              )}

              {!isLoadingDeliveries &&
                !isErrorDeliveries &&
                deliveries &&
                (deliveries.length === 0 ||
                  deliveries.every(
                    (d) => d.delivery_status === "menunggu persetujuan"
                  )) && (
                  <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
                    <div className="text-center text-gray-500">
                      <Award size={32} className="mx-auto mb-2 text-gray-400" />
                      <p>Belum ada riwayat pengiriman</p>
                    </div>
                  </div>
                )}

              {!isLoadingDeliveries &&
                !isErrorDeliveries &&
                deliveries &&
                deliveries.length > 0 && (
                  <div className="space-y-4">
                    {deliveries
                      .filter(
                        (delivery) =>
                          delivery.delivery_status !== "menunggu persetujuan"
                      )
                      .map((delivery) => (
                        <div
                          key={delivery.id}
                          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-lg font-medium">
                                {delivery.load_type}: {delivery.load}
                              </p>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <MapPin size={14} className="mr-1" />
                                {delivery.destination_address}
                              </div>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <Calendar size={14} className="mr-1" />
                                {formatDate(delivery.delivery_date)}
                              </div>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                delivery.delivery_status === "selesai"
                                  ? "bg-green-100 text-green-800"
                                  : delivery.delivery_status ===
                                    "dalam perjalanan"
                                  ? "bg-blue-100 text-blue-800"
                                  : delivery.delivery_status ===
                                    "menunggu persetujuan"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {delivery.delivery_status}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverDetailPage;
