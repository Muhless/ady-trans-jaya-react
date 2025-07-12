import { MapPin, X } from "lucide-react";
import { InputLatLang } from "./InputLatLang";

interface CoordinateInputProps {
  pointLabel: "start" | "end" | `destination-${number}`;
  latitude: number | null;
  longitude: number | null;
  onSelectPoint: () => void;
  isSelected: boolean;
  displayLabel?: string;
}

export const CoordinateInput: React.FC<CoordinateInputProps> = ({
  pointLabel,
  latitude,
  longitude,
  onSelectPoint,
  isSelected,
}) => {
  const buttonColor = isSelected
    ? "bg-blue-500 hover:bg-blue-600"
    : "bg-gray-400 hover:bg-gray-500";

  return (
    <div className="flex w-full gap-3 items-center">
      <InputLatLang
        placeholder="Latitude"
        disabled
        value={latitude}
        isSelected={isSelected}
      />
      <InputLatLang
        placeholder="Longitude"
        disabled
        value={longitude}
        isSelected={isSelected}
      />
      <button
        type="button"
        onClick={onSelectPoint}
        className={`p-2 text-white rounded-md ${buttonColor}`}
        aria-label={`Pilih titik ${pointLabel}`}
      >
        <MapPin size={20} />
      </button>
    </div>
  );
};
