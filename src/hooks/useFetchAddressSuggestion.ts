import React, { useState } from "react";
import mapboxgl from "mapbox-gl";

interface Place {
  id: string;
  place_name: string;
  geometry: {
    coordinates: [number, number];
  };
}

export const useFetchAddressSuggestionHooks = () => {
  const [startSuggestions, setStartSuggestions] = useState<Place[]>([]);
  const [endSuggestions, setEndSuggestions] = useState<Place[]>([]);

  const fetchAddressSuggestions = async (
    query: string,
    setSuggestions: React.Dispatch<React.SetStateAction<Place[]>>
  ) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const MAPBOX_ACCESS_TOKEN =
      "pk.eyJ1IjoibXVobGVzcyIsImEiOiJjbTZtZGM1eXUwaHQ5MmtwdngzaDFnaWxnIn0.jH96XLB-3WDcrw9OKC95-A";

    console.log("Mapbox Access Token:", MAPBOX_ACCESS_TOKEN);
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?autocomplete=true&bbox=104.5,-8.5,114.5,-5.5&access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();
      if (data.features) {
        setSuggestions(data.features);
      }
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  };

  return {
    startSuggestions,
    setStartSuggestions,
    endSuggestions,
    setEndSuggestions,
    fetchAddressSuggestions,
  };
};
