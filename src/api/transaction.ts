// src/api/transaction.ts
import axios from "axios";
import { API_BASE_URL } from "../apiConfig";

export const fetchTransactions = async () => {
  const response = await axios.get(`${API_BASE_URL}/transactions`);
  return response.data.data;
};
