import axios from "axios";
import { API_BASE_URL } from "../apiConfig";

export const fetchDrivers = async () => {
  const response = await axios.get(`${API_BASE_URL}/drivers`);
  return response.data.data;
};

export const searchDriver = async (query: string) => {
  const response = await axios.get(`${API_BASE_URL}/drivers`, {
    params: { search: query },
  });
  return response.data.data;
};

export const addDriver = async (data: Record<string, any>) => {
  const response = await axios.post(`${API_BASE_URL}/driver`, data);
  return response.data.data;
};

export const updateDriver = async (id: number, data: Record<string, any>) => {
  const response = await axios.put(`${API_BASE_URL}/driver/${id}`, data);
  return response.data.data;
};

export const deleteDriver = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/driver/${id}`);
  return response.data.message;
};
