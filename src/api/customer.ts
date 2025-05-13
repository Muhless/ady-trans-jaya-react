import axios from "axios";
import { API_BASE_URL } from "../apiConfig";

export const fetchCustomers = async () => {
  const response = await axios.get(`${API_BASE_URL}/customers`);
  return response.data.data;
};

export const searchCustomer = async (query: string) => {
  const response = await axios.get(`${API_BASE_URL}/customers`, {
    params: { search: query },
  });
  return response.data.data;
};

export const addCustomer = async (data: Record<string, any>) => {
  const response = await axios.post(`${API_BASE_URL}/customer`, data);
  return response.data.data;
};

export const updateCustomer = async (id: number, data: Record<string, any>) => {
  const response = await axios.put(`${API_BASE_URL}/customer/${id}`, data);
  return response.data.data;
};

export const deleteCustomer = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/customer/${id}`);
  return response.data.message;
};
