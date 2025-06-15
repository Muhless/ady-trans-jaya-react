import axios from "axios";
import { API_BASE_URL } from "../apiConfig";

export const fetchDeliveries = async () => {
  const response = await axios.get(`${API_BASE_URL}/deliveries`);
  return response.data.data;
};

export const fetchDeliveryById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/delivery/${id}`);
  return response.data.data;
};

export const addDeliveries = async (data: Record<string, any>) => {
  const response = await axios.post(`${API_BASE_URL}/delivery`, data);
  return response.data.data;
};

export const updateDeliveries = async (
  id: number,
  data: Record<string, any>
) => {
  const response = await axios.put(`${API_BASE_URL}/delivery/${id}`, data);
  return response.data.data;
};

export const updateDeliveryStatus = async (id: number, status: string) => {
  const response = await axios.patch(`${API_BASE_URL}/delivery/${id}/status`, {
    delivery_status: status,
  });
  return response.data.data;
};

export const deleteDeliveries = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/delivery/${id}`);
  return response.data.message;
};
