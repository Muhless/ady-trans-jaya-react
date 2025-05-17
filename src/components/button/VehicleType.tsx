type Vehicle = {
  id: number;
  name: string;
  type: string;
};

type Props = {
  vehicleTypes: string[];
  vehicles: Vehicle[];
  selectedType: string;
  setSelectedType: (type: string) => void;
};

export const VehicleTypeComponent = ({
  vehicleTypes,
  selectedType,
  setSelectedType,
}: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2 flex-wrap">
        {vehicleTypes.map((type, index) => (
          <div
            key={index}
            className={`flex items-center justify-center cursor-pointer w-32 text-sm p-2 rounded transition-all duration-300 ${
              selectedType === type
                ? "bg-kuning"
                : "bg-text text-background hover:bg-merah hover:text-text"
            }`}
            onClick={() => setSelectedType(type)}
          >
            <h1>{type}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};
