import { useParams } from "react-router-dom";
import useNavigationHooks from "../../hooks/useNavigation";
import { formatCurrency } from "../../../utils/Formatters";
import { fetchDeliveryById, updateDeliveryStatus } from "@/api/delivery";
import { useQuery } from "@tanstack/react-query";
import TitleComponent from "@/components/Title";
import DeliveryInfoComponent from "@/components/card/delivery/DeliveryInfoCard";
import VehicleInfoComponent from "@/components/card/delivery/VehicleInfoCard";
import DriverInfoComponent from "@/components/card/delivery/DriverInfoCard";
import CustomerInfoComponent from "@/components/card/delivery/CustomerInfoCard";
import ButtonComponent from "@/components/button/Index";
import { toast } from "sonner";

const DetailDeliveryPage = () => {
  const { id } = useParams();

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
      toast.success("Pengiriman disetujui!");

      await refetch();
    } catch (err) {
      toast.success("Pengiriman ditolak!");
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
      </div>
    </>
  );
};

export default DetailDeliveryPage;
