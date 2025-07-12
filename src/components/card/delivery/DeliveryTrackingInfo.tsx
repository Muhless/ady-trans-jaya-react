import React from "react";
import {
  Package,
  Truck,
  PackageCheck,
  AlertCircle,
  XCircle,
  Play,
  CheckCircle,
  Ban,
  Clock3Icon,
} from "lucide-react";

interface DeliveryTrackingProps {
  status: string;
  className?: string;
  deliveryProgress?: {
    id: number;
    delivery_id: number;
    delivery_start_time: string;
    pickup_time: string | null;
    pickup_photo_url: string;
    arrival_time: string | null;
    arrival_photo_url: string;
    created_at: string;
    updated_at: string;
  }[];
}

const deliverySteps = [
  {
    key: "menunggu persetujuan",
    label: "Menunggu Persetujuan",
    icon: AlertCircle,
    description: "Pengiriman sedang menunggu persetujuan",
  },
  {
    key: "disetujui",
    label: "Disetujui",
    icon: CheckCircle,
    description: "Pengiriman telah disetujui",
  },
  {
    key: "menunggu pengemudi",
    label: "Menunggu Pengemudi",
    icon: Package,
    description: "Menunggu pengemudi memulai pengiriman",
  },
  {
    key: "dalam pengiriman",
    label: "Dalam Pengiriman",
    icon: Truck,
    description: "Pengiriman sedang dalam pengiriman ke tujuan",
  },
  {
    key: "selesai",
    label: "Selesai",
    icon: PackageCheck,
    description: "Pengiriman telah diselesaikan oleh pengemudi",
  },
  {
    key: "dibatalkan",
    label: "Dibatalkan",
    icon: XCircle,
    description: "Pengiriman dibatalkan",
  },
  {
    key: "ditolak",
    label: "Ditolak",
    icon: Ban,
    description: "Pengiriman ditolak dan tidak dapat dilanjutkan",
  },
];

const getCurrentStepIndex = (status: string): number => {
  const statusMap: { [key: string]: number } = {
    "menunggu persetujuan": 0,
    disetujui: 1,
    "menunggu pengemudi": 2,
    "dalam pengiriman": 3,
    selesai: 4,
    dibatalkan: -1,
    ditolak: -2,
  };
  return statusMap[status.toLowerCase()] ?? 0;
};

const getStepStatus = (
  stepIndex: number,
  currentStepIndex: number,
  isCancelled: boolean,
  isRejected: boolean
) => {
  if (isCancelled) {
    return stepIndex === 5 ? "cancelled" : "inactive";
  }
  if (isRejected) {
    return stepIndex === 6 ? "rejected" : "inactive";
  }
  if (stepIndex < currentStepIndex) return "completed";
  if (stepIndex === currentStepIndex) return "current";
  return "upcoming";
};

const DeliveryTracking: React.FC<DeliveryTrackingProps> = ({
  status,
  className = "",
}) => {
  const currentStepIndex = getCurrentStepIndex(status);
  const isCancelled = status.toLowerCase() === "dibatalkan";
  const isRejected = status.toLowerCase() === "ditolak";

  let stepsToShow = deliverySteps.filter(
    (step) => step.key !== "dibatalkan" && step.key !== "ditolak"
  );

  if (isCancelled) {
    stepsToShow = deliverySteps.filter((step) => step.key === "dibatalkan");
  } else if (isRejected) {
    stepsToShow = deliverySteps.filter((step) => step.key === "ditolak");
  }

  return (
    <div className={`bg-gray-50 rounded-lg p-6 border ${className}`}>
      <h2 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
        <Clock3Icon className="mr-2 text-blue-500" size={20} />
        Status Pengiriman
      </h2>

      <div className="space-y-4">
        {stepsToShow.map((step, index) => {
          const stepStatus = getStepStatus(
            deliverySteps.findIndex((s) => s.key === step.key),
            currentStepIndex,
            isCancelled,
            isRejected
          );
          const IconComponent = step.icon;

          return (
            <div key={step.key} className="flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div
                  className={`
                  rounded-full p-2 border-2 
                  ${
                    stepStatus === "completed"
                      ? "bg-green-100 border-green-500 text-green-600"
                      : ""
                  }
                  ${
                    stepStatus === "current"
                      ? "bg-blue-100 border-blue-500 text-blue-600"
                      : ""
                  }
                  ${
                    stepStatus === "upcoming"
                      ? "bg-gray-100 border-gray-300 text-gray-400"
                      : ""
                  }
                  ${
                    stepStatus === "cancelled"
                      ? "bg-red-100 border-red-500 text-red-600"
                      : ""
                  }
                  ${
                    stepStatus === "rejected"
                      ? "bg-orange-100 border-orange-500 text-orange-600"
                      : ""
                  }
                  ${
                    stepStatus === "inactive"
                      ? "bg-gray-100 border-gray-200 text-gray-300"
                      : ""
                  }
                `}
                >
                  <IconComponent size={16} />
                </div>

                {index < stepsToShow.length - 1 && (
                  <div
                    className={`
                    w-0.5 h-8 mt-2
                    ${
                      stepStatus === "completed"
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }
                  `}
                  />
                )}
              </div>

              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between">
                  <h4
                    className={`
                    font-medium text-sm
                    ${stepStatus === "completed" ? "text-green-700" : ""}
                    ${stepStatus === "current" ? "text-blue-700" : ""}
                    ${stepStatus === "upcoming" ? "text-gray-500" : ""}
                    ${stepStatus === "cancelled" ? "text-red-700" : ""}
                    ${stepStatus === "rejected" ? "text-orange-700" : ""}
                    ${stepStatus === "inactive" ? "text-gray-400" : ""}
                  `}
                  >
                    {step.label}
                  </h4>
                </div>

                <p
                  className={`
                  text-xs mt-1
                  ${stepStatus === "completed" ? "text-green-600" : ""}
                  ${stepStatus === "current" ? "text-blue-600" : ""}
                  ${stepStatus === "upcoming" ? "text-gray-400" : ""}
                  ${stepStatus === "cancelled" ? "text-red-600" : ""}
                  ${stepStatus === "rejected" ? "text-orange-600" : ""}
                  ${stepStatus === "inactive" ? "text-gray-300" : ""}
                `}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {!isCancelled && !isRejected && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Progress Pengiriman</span>
            <span>
              {Math.round(((currentStepIndex + 1) / stepsToShow.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: `${
                  ((currentStepIndex + 1) / stepsToShow.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryTracking;
