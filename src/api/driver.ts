import axios from "axios";
import { API_BASE_URL } from "../apiConfig";

export const fetchDrivers = async () => {
  const response = await axios.get(`${API_BASE_URL}/drivers`);
  return response.data.data;
};

export const fetchDriverById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/driver/${id}`);
  if (!response.ok) {
    throw new Error("Gagal mengambil data driver");
  }
  const data = await response.json();
  return data.data;
};

export const searchDriver = async (query: string) => {
  const response = await axios.get(`${API_BASE_URL}/drivers`, {
    params: { search: query },
  });
  return response.data.data;
};

export const addDriver = async (data: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/driver`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const updateDriver = async (id: number, data: Record<string, any>) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("phone", data.phone);
  formData.append("address", data.address);
  formData.append("status", data.status);
  formData.append("username", data.username);
  formData.append("password", data.password);
  if (data.photo && data.photo.length > 0) {
    formData.append("photo", data.photo[0]);
  }

  await axios.put(`${API_BASE_URL}/driver/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteDriver = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/driver/${id}`);
  return response.data.message;
};
