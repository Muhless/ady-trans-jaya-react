import axios from "axios";
import { API_BASE_URL } from "../apiConfig";

const API = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (username, password) => {
    const response = await API.post("/login", { username, password });
    return response.data;
  },

  validateToken: async () => {
    const response = await API.get("/validate-token");
    return response.data;
  },

  logout: async () => {
    try {
      await API.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  },
};

export default API;
