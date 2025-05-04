import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Award,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Truck,
  Edit,
  Trash,
} from "lucide-react";

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

const fetchDriverDetails = async (id: string) => {
  const response = await fetch(`http://localhost:8080/api/driver/${id}`);
  if (!response.ok) {
    throw new Error("Gagal mengambil data driver");
  }
  const data = await response.json();
  return data.data;
};

const fetchDriverDeliveries = async (id: string) => {
  const response = await fetch(
    `http://localhost:8080/api/deliveries/search?driver_id=${id}`
  );
  if (!response.ok) {
    throw new Error("Gagal mengambil riwayat pengiriman");
  }
  const data = await response.json();
  return data.data;
};

function DriverDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "history">("profile");

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoadingDriver) {
    return (
      <div className="flex items-center justify-center bg-gray-50 h-screen ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isErrorDriver) {
    return (
      <div className="flex items-center justify-center bg-gray-50 h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <h3 className="font-bold mb-2">Error</h3>
          <p>{(errorDriver as Error).message}</p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            onClick={() => navigate(-1)}
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 h-screen py-6 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Detail Driver</h1>

          <div className="ml-auto flex space-x-2">
            <button className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm transition-colors">
              <Edit size={16} className="mr-1" /> Edit
            </button>
            <button className="flex items-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm transition-colors">
              <Trash size={16} className="mr-1" /> Hapus
            </button>
          </div>
        </div>

        <div className="mb-6">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              driver?.status === "tersedia"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {driver?.status === "tersedia" ? (
              <>
                <CheckCircle size={16} className="mr-1" /> Tersedia
              </>
            ) : (
              <>
                <XCircle size={16} className="mr-1" /> Tidak Tersedia
              </>
            )}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary/70 p-6 text-center h-96">
                {driver?.photo ? (
                  <img
                    src={driver.photo}
                    alt={driver.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <User size={64} className="text-gray-400" />
                  </div>
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

          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                      activeTab === "profile"
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Profil Driver
                  </button>
                  <button
                    onClick={() => setActiveTab("history")}
                    className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                      activeTab === "history"
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Riwayat Pengiriman
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-100">
                        Informasi Driver
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Nama Lengkap
                          </p>
                          <p className="font-medium">{driver?.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Status</p>
                          <p className="font-medium capitalize">
                            {driver?.status}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Nomor Telepon
                          </p>
                          <p className="font-medium">{driver?.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Terakhir Diperbarui
                          </p>
                          <p className="font-medium">
                            {driver?.updated_at
                              ? formatDate(driver.updated_at)
                              : "-"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-100">
                        Alamat
                      </h3>
                      <p>{driver?.address}</p>
                    </div>
                  </div>
                )}

                {activeTab === "history" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Riwayat Pengiriman
                    </h3>

                    {isLoadingDeliveries && (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                      </div>
                    )}

                    {isErrorDeliveries && (
                      <div className="bg-red-50 p-4 rounded-lg text-red-600">
                        Gagal memuat riwayat pengiriman
                      </div>
                    )}

                    {!isLoadingDeliveries &&
                      !isErrorDeliveries &&
                      deliveries &&
                      deliveries.length > 0 &&
                      deliveries.every(
                        (d) => d.delivery_status === "menunggu persetujuan"
                      ) && (
                        <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
                          <div className="text-center text-gray-500">
                            <Award
                              size={32}
                              className="mx-auto mb-2 text-gray-400"
                            />
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
                                delivery.delivery_status !==
                                "menunggu persetujuan"
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverDetailPage;
