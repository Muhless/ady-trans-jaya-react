import axios from "axios";
import { API_BASE_URL } from "../apiConfig";

export const fetchVehicles = async () => {
  const response = await axios.get(`${API_BASE_URL}/vehicles`);
  return response.data.data;
};

export const addVehicle = async (data: Record<string, any>) => {
  const response = await axios.post(`${API_BASE_URL}/vehicle`, data);
  return response.data.data;
};

export const updateVehicle = async (id: number, data: Record<string, any>) => {
  const response = await axios.patch(`${API_BASE_URL}/vehicle/${id}`, data);
  return response.data.data;
};

export const deleteVehicle = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/vehicle/${id}`);
  return response.data.message;
};
