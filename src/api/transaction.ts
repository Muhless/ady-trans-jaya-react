// api/transaction.js
import { API_BASE_URL } from "@/apiConfig";
import axios from "axios";

export const fetchTransactions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch transactions"
    );
  }
};

export const fetchTransactionById = async (id) => {
  try {
    if (!id) {
      throw new Error("Transaction ID is required");
    }

    const response = await axios.get(`${API_BASE_URL}/transactions/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch transaction"
    );
  }
};

export const fetchTransactionsPaginated = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/transactions?page=${page}&limit=${limit}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch transactions"
    );
  }
};

export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/transactions`,
      transactionData
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create transaction"
    );
  }
};

// Function untuk update transaksi
export const updateTransaction = async (id, transactionData) => {
  try {
    if (!id) {
      throw new Error("Transaction ID is required");
    }

    const response = await axios.put(
      `${API_BASE_URL}/transactions/${id}`,
      transactionData
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update transaction"
    );
  }
};

export const deleteTransaction = async (id) => {
  try {
    if (!id) {
      throw new Error("Transaction ID is required");
    }

    const response = await axios.delete(`${API_BASE_URL}/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete transaction"
    );
  }
};
