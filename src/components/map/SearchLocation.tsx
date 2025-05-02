import React, { useState } from "react";
import mapboxgl from "mapbox-gl";
import { Search } from "lucide-react";

interface Place {
  id: string;
  place_name: string;
  geometry: {
    coordinates: [number, number];
  };
}

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  onSelectPlace: (place: Place) => void;
  mapRef: React.MutableRefObject<mapboxgl.Map | null>;
};

const SearchLocationInput = ({
  label,
  placeholder,
  value,
  onSelectPlace,
  mapRef,
}: Props) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<Place[]>([]);

  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoibXVobGVzcyIsImEiOiJjbTZtZGM1eXUwaHQ5MmtwdngzaDFnaWxnIn0.jH96XLB-3WDcrw9OKC95-A";
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

  const fetchSuggestions = async (query: string) => {
    if (!query) return setSuggestions([]);
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&autocomplete=true&limit=5&bbox=105.0,-9.0,115.0,-5.0`
    );
    const data = await res.json();
    setSuggestions(data.features);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    fetchSuggestions(val);
  };

  const handleSelect = (place: Place) => {
    setInputValue(place.place_name);
    setSuggestions([]);
    onSelectPlace(place);

    const [lng, lat] = place.geometry.coordinates;
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [lng, lat], zoom: 15 });
    }
  };

  return (
    <div className="relative border">
      <span className="absolute inset-y-0 flex items-center transition-colors duration-200 left-3">
        <Search size={18} />
      </span>
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChange}
        className="px-5 py-1 pl-10 text-sm rounded-md bg-secondary focus:border-background focus:outline-none focus:ring-2 focus:ring-biru peer w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow max-h-48 overflow-y-auto">
          {suggestions.map((place) => (
            <li
              key={place.id}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm"
              onClick={() => handleSelect(place)}
            >
              {place.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchLocationInput;
