import React, { useState } from "react";
import {
  Package,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  Box,
  Weight,
  Hash,
  BoxesIcon,
} from "lucide-react";
import {
  formatCurrency,
  formatDateNumeric,
} from "../../../../utils/Formatters";
import DeliveryTrackingInfo from "./DeliveryTrackingInfo";
import { useAuthStore } from "@/stores/AuthStore";
import ButtonComponent from "@/components/button/Index";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import useNavigationHooks from "@/hooks/useNavigation";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { SuratJalanPDF } from "@/components/print/DeliveryPrintPages";
import DeliveryProgressDetail from "./DeliveryProgress";
import DeliveryDestinationCard from "./DeliveryDestination";
import { DeliveryItem } from "@/stores/deliveryDestinationStore";

interface DeliveryProgress {
  id: number;
  delivery_id: number;
  delivery_start_time: string;
  pickup_time: string | null;
  pickup_photo_url: string;
  arrival_time: string | null;
  arrival_photo_url: string;
  created_at: string;
  updated_at: string;
}

interface DeliveryInfo {
  id: number;
  delivery_code: string;
  load_type: string;
  total_weight: number;
  total_item: number;
  pickup_address: string;
  pickup_address_lat: number;
  pickup_address_lang: number;
  destination_address: string;
  destination_address_lat: number;
  destination_address_lang: number;
  delivery_date: string;
  delivery_deadline_date: string;
  delivery_status: string;
  delivery_cost: number;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  items: DeliveryItem[];
  delivery_progress: DeliveryProgress[];
}

interface DeliveryInfoComponentProps {
  delivery: DeliveryInfo;
  formatDate?: (date: string) => string;
  className?: string;
  onApprove: () => void;
  onReject: () => void;
}

const DeliveryInfoComponent: React.FC<DeliveryInfoComponentProps> = ({
  delivery,
  className = "",
  onApprove,
  onReject,
}) => {
  const role = useAuthStore((state) => state.role);
  const { goToDeliveryMapPages } = useNavigationHooks();
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex justify-between border-b pb-2 mb-4">
        <h2 className="text-lg font-semibold flex items-center ">
          <Package className="mr-2 text-blue-500" size={20} />
          Informasi Pengiriman
        </h2>
        {role === "owner" &&
          delivery.delivery_status === "menunggu persetujuan" && (
            <div className="flex gap-2">
              <ConfirmDialog
                trigger={
                  <ButtonComponent
                    label="Tolak Pengiriman"
                    variant="reject"
                    className="w-48 h-full"
                  />
                }
                title="Tolak Pengiriman"
                description="Yakin ingin menolak pengiriman ini ?"
                onConfirm={onReject}
              />
              <ConfirmDialog
                trigger={
                  <ButtonComponent
                    label="Setujui Pengiriman"
                    variant="approve"
                    className="w-48 h-full"
                  />
                }
                title="Setujui Pengiriman"
                description="Yakin ingin menyetujui pengiriman ini ?"
                onConfirm={onApprove}
              />
            </div>
          )}
        {!["menunggu persetujuan", "ditolak"].includes(
          delivery.delivery_status
        ) && (
          <div className="flex gap-1">
            <ButtonComponent
              variant="preview"
              onClick={() => setShowPreview(true)}
            />
            {showPreview && (
              <div
                className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
                onClick={() => setShowPreview(false)}
              >
                <div
                  className="bg-white rounded-lg shadow-lg w-2/3 h-full relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-2 right-2 text-black"
                    onClick={() => setShowPreview(false)}
                  >
                    ✕
                  </button>
                  <PDFViewer width="100%" height="100%" showToolbar>
                    <SuratJalanPDF delivery={delivery} />
                  </PDFViewer>
                </div>
              </div>
            )}

            <PDFDownloadLink
              document={<SuratJalanPDF delivery={delivery} />}
              fileName={`SuratJalan-${delivery.delivery_code}.pdf`}
            >
              <ButtonComponent variant="print" />
            </PDFDownloadLink>

            {showPreview && (
              <div
                style={{ width: "100%", height: "600px", marginTop: "20px" }}
              >
                <PDFViewer width="100%" height="100%">
                  <SuratJalanPDF delivery={delivery} />
                </PDFViewer>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">ID Pengiriman</p>
            <p className="font-medium">{delivery.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Kode Pengiriman</p>
            <p className="font-medium">
              {delivery.delivery_code || "Belum ada kode"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Barang</p>
            <div className="flex items-center">
              <Hash className="mr-1 text-gray-400" size={16} />
              <p className="font-medium">{delivery.total_item}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Jenis Barang</p>
            <div className="flex items-center">
              <p className="font-medium">{delivery.load_type} </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 ">Daftar Barang</p>
          <div className="space-y-3">
            {delivery.items && delivery.items.length > 0 ? (
              delivery.items.map((item, index) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start">
                    <Box
                      className="mr-2 text-blue-500 flex-shrink-0 mt-1"
                      size={16}
                    />
                    <div className="flex-grow ">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900">
                          {item.item_name}
                        </h4>
                        <div className="text-sm">
                          <span className="text-gray-500">Jumlah: </span>
                          <span className="font-medium">{item.quantity}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Berat: </span>
                          <span className="font-medium">{item.weight}kg</span>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-500">
                  Tidak ada item dalam pengiriman ini
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Alamat Penjemputan Barang</p>
            <div className="flex items-center mt-1">
              <div>
                <div className="flex items-center">
                  <MapPin
                    className="mr-2 text-gray-400 flex-shrink-0"
                    size={16}
                  />
                  <p>
                    {delivery.pickup_address ||
                      "Alamat pengiriman tidak tersedia"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex items-center hover:cursor-pointer">
            <p
              className="underline italic text-sm text-blue-500"
              onClick={() => goToDeliveryMapPages(delivery.id)}
            >
              lihat lokasi
            </p>
          </div> */}
        </div>

        {/* <DeliveryDestinationCard destination={delivery}/> */}

        <div className="grid grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Tanggal Pengiriman</p>
            <div className="flex items-center">
              <Calendar className="mr-2 text-gray-400" size={16} />
              <p>{formatDateNumeric(delivery.delivery_date)}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Batas Pengiriman</p>
            <div className="flex items-center">
              <Clock className="mr-2 text-gray-400" size={16} />
              <p>{formatDateNumeric(delivery.delivery_deadline_date)}</p>
            </div>
          </div>
        </div>

        <div>
          <div>
            <p className="text-sm text-gray-500">Biaya Pengiriman</p>
            <p className="font-bold">
              {formatCurrency(delivery.delivery_cost)}
            </p>
          </div>
        </div>

        {delivery.delivery_progress?.[0] && (
          <DeliveryProgressDetail progress={delivery.delivery_progress?.[0]} />
        )}

        <DeliveryTrackingInfo
          status={delivery.delivery_status}
          deliveryProgress={delivery.delivery_progress}
        />

        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 text-center text-xs text-gray-500">
            <div>
              <p>Dibuat: {formatDateNumeric(delivery.created_at)}</p>
            </div>
            <div>
              <p>Diperbarui: {formatDateNumeric(delivery.updated_at)}</p>
            </div>
            {delivery.approved_at && (
              <div>
                <p>Disetujui: {formatDateNumeric(delivery.approved_at)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfoComponent;
