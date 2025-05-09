import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import useNavigationHooks from "../../hooks/useNavigation";
import ButtonComponent from "../../components/button/Index";
import {
  MapPin,
  Package,
  Calendar,
  Clock,
  Truck,
  User,
  Building,
  Phone,
  Mail,
  Check,
  UserCog2Icon,
} from "lucide-react";
import { API_BASE_URL } from "../../apiConfig";

const DetailDeliveryPage = () => {
  const { id } = useParams();
  const [delivery, setDelivery] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { goBack } = useNavigationHooks();

  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/deliveries/${id}`
        );
        setDelivery(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Gagal memuat data pengiriman");
        setLoading(false);
      }
    };

    fetchDeliveryDetails();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-50 py-3 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold text-gray-800">
            Detail Pengiriman
          </h1>
          <ButtonComponent label="Kembali" variant="back" onClick={goBack} />
        </div>

        <div className="mb-3">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              delivery.delivery_status === "menunggu persetujuan"
                ? "bg-yellow-100 text-yellow-800"
                : delivery.delivery_status === "disetujui"
                ? "bg-green-100 text-green-800"
                : delivery.delivery_status === "dalam perjalanan"
                ? "bg-blue-100 text-blue-800"
                : delivery.delivery_status === "selesai"
                ? "bg-indigo-100 text-indigo-800"
                : delivery.delivery_status === "dibatalkan"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {delivery.delivery_status}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
              <User className="mr-2 text-blue-500" size={20} />
              Informasi Pelanggan
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Nama</p>
                <p className="font-medium">
                  {delivery.transaction?.customer?.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Perusahaan</p>
                <div className="flex items-center">
                  <Building className="mr-2 text-gray-400" size={16} />
                  <p>{delivery.transaction?.customer?.company}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <div className="flex items-center">
                  <Mail className="mr-2 text-gray-400" size={16} />
                  <p>{delivery.transaction?.customer?.email}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Telepon</p>
                <div className="flex items-center">
                  <Phone className="mr-2 text-gray-400" size={16} />
                  <p>{delivery.transaction?.customer?.phone}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Alamat</p>
                <p className="text-sm">
                  {delivery.transaction?.customer?.address}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
              <Package className="mr-2 text-blue-500" size={20} />
              Informasi Pengiriman
            </h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Jenis Muatan</p>
                  <p className="font-medium">{delivery.load_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Isi Muatan</p>
                  <p className="font-medium">{delivery.load}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Jumlah</p>
                  <p className="font-medium">{delivery.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Berat</p>
                  <p className="font-medium">{delivery.weight}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Alamat Jemput</p>
                <div className="flex items-start mt-1">
                  <MapPin
                    className="mr-2 text-red-500 flex-shrink-0"
                    size={16}
                  />
                  <p className="text-sm">{delivery.pickup_address}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Lat: {delivery.pickup_address_lat}, Long:{" "}
                  {delivery.pickup_address_lang}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Alamat Tujuan</p>
                <div className="flex items-start mt-1">
                  <MapPin
                    className="mr-2 text-green-500 flex-shrink-0"
                    size={16}
                  />
                  <p className="text-sm">{delivery.destination_address}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Lat: {delivery.destination_address_lat}, Long:{" "}
                  {delivery.destination_address_lang}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Tanggal Kirim</p>
                  <div className="flex items-center">
                    <Calendar className="mr-2 text-gray-400" size={16} />
                    <p>{formatDate(delivery.delivery_date)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Batas Pengiriman</p>
                  <div className="flex items-center">
                    <Clock className="mr-2 text-gray-400" size={16} />
                    <p>{formatDate(delivery.delivery_deadline_date)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
                <UserCog2Icon className="mr-2 text-blue-500" size={20} />
                Informasi Pengemudi
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Nama Pengemudi</p>
                  <p className="font-medium">{delivery.driver?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nomor Telepon</p>
                  <p className="font-medium">{delivery.driver?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Alamat</p>
                  <p className="font-medium text-sm">
                    {delivery.driver?.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
                <Truck className="mr-2 text-blue-500" size={20} />
                Informasi Kendaraan
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Kendaraan</p>
                  <p className="font-medium">{delivery.vehicle?.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Tipe</p>
                    <p>{delivery.vehicle?.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Plat Nomor</p>
                    <p>{delivery.vehicle?.license_plate || "-"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Kapasitas</p>
                    <p>{delivery.vehicle?.capacity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tarif per KM</p>
                    <p>{formatCurrency(delivery.vehicle?.rate_per_km)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          {delivery.delivery_status === "disetujui" && (
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
              Mulai Pengiriman
            </button>
          )}
          {delivery.delivery_status === "dalam perjalanan" && (
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md">
              Selesaikan Pengiriman
            </button>
          )}
          <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50">
            Cetak Surat Jalan
          </button>
          {delivery.delivery_status === "menunggu persetujuan" && (
            <>
              <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
                Tolak Pengiriman
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center">
                <Check size={18} className="mr-2" /> Setujui Pengiriman
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailDeliveryPage;
