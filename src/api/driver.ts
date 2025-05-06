import { API_BASE_URL } from "../apiConfig";

export const fetchDrivers = async (query = "") => {
  let url = `${API_BASE_URL}/driver`;
  if (query) {
    url += `?search=${encodeURIComponent(query)}`;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error("Gagal fetch driver");

  const json = await response.json();
  return Array.isArray(json.data) ? json.data : [];
};
