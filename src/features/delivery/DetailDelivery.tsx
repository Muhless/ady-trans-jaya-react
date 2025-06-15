import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useNavigationHooks from "../../hooks/useNavigation";
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
  ArrowLeft,
  BookCheckIcon,
} from "lucide-react";
import { API_BASE_URL } from "../../apiConfig";
import { useAuthStore } from "@/stores/AuthStore";
import { formatDate, formatCurrency } from "../../../utils/Formatters";
import { Button } from "@/components/ui/button";
import {
  fetchDeliveries,
  fetchDeliveryById,
  updateDeliveryStatus,
} from "@/api/delivery";
import { useQuery } from "@tanstack/react-query";
import TitleComponent from "@/components/Title";
import DeliveryInfoCard from "./DeliveryInfoCard";
import DeliveryInfoComponent from "@/components/card/delivery/DeliveryInfoCard";
import VehicleInfoComponent from "@/components/card/delivery/VehicleInfoCard";
import DriverInfoComponent from "@/components/card/delivery/DriverInfoCard";
import CustomerInfoCard from "../customer/CustomerInfoCard";
import CustomerInfoComponent from "@/components/card/delivery/CustomerInfoCard";
import ButtonComponent from "@/components/button/Index";

const DetailDeliveryPage = () => {
  const { id } = useParams();
  const { goBack } = useNavigationHooks();
  const role = useAuthStore((state) => state.role);

  const {
    data: delivery,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["delivery", id],
    queryFn: () => fetchDeliveryById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError || !delivery) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Gagal memuat detail pengiriman.</p>
        </div>
      </div>
    );
  }

  const handleApprove = async (id: number) => {
    try {
      await updateDeliveryStatus(id, "disetujui");
      await refetch();
    } catch (err) {
      console.error("Gagal menyetujui", err);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await updateDeliveryStatus(id, "ditolak");
      await refetch();
    } catch (err) {
      console.error("Gagal menolak", err);
    }
  };

  return (
    <>
      <TitleComponent title="Detail Pengiriman" />

      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col col-span-1 space-y-6">
          <CustomerInfoComponent delivery={delivery} />

          <DriverInfoComponent delivery={delivery} />

          <VehicleInfoComponent
            delivery={delivery}
            formatCurrency={formatCurrency}
          />
        </div>
        <div className="col-span-2">
          <DeliveryInfoComponent
            delivery={delivery}
            onApprove={() => handleApprove(delivery.id)}
            onReject={() => handleReject(delivery.id)}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-4">
        <ButtonComponent
          label="Kembali"
          variant="back"
          className="h-full w-48"
        />
        {delivery.delivery_status === "disetujui" && (
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-md">
            Mulai Pengiriman
          </button>
        )}
        {delivery.delivery_status === "dalam perjalanan" && (
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 rounded-md">
            Selesaikan Pengiriman
          </button>
        )}
        {delivery.delivery_status === "disetujui" && (
          <button className="border border-gray-300 text-gray-700 px-4 rounded-md hover:bg-gray-50">
            Cetak Surat Jalan
          </button>
        )}
      </div>
    </>
  );
};

export default DetailDeliveryPage;
