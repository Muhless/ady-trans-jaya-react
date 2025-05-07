import { API_BASE_URL } from "./../apiConfig";
import { create } from "zustand";
import axios from "axios";
import useNavigationHooks from "../hooks/useNavigation";

interface User {
  id: number;
  username: string;
  name?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  setUser: (User: User) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // State
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,

  // Actions
  login: async (username, password) => {
    set({ isLoading: true, error: null });

    try {
      // Ganti URL API sesuai dengan endpoint login Anda
      const response = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });

      // Simpan token ke localStorage
      localStorage.setItem("token", response.data.token);

      // Update state
      set({
        isLoading: false,
        isAuthenticated: true,
        user: response.data.user,
        token: response.data.token,
        error: null,
      });

      // Tambahkan token ke header default untuk semua request
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      return true; // Login berhasil
    } catch (error: any) {
      // Handle error
      const errorMessage =
        error.response?.data?.message || "Login gagal. Silakan coba lagi.";

      set({
        isLoading: false,
        error: errorMessage,
        isAuthenticated: false,
        token: null,
        user: null,
      });

      return false; // Login gagal
    }
  },

  logout: () => {
    localStorage.removeItem("token");

    delete axios.defaults.headers.common["Authorization"];

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
    window.location.href = "/login";
  },

  // Fungsi untuk mengecek apakah token masih valid
  checkAuth: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({ isAuthenticated: false, user: null });
      return false;
    }

    try {
      // Tambahkan token ke header request
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Ganti URL API sesuai dengan endpoint untuk validasi token
      // const response = await axios.get(`${API_BASE_URL}/user`);
      const response = await axios.get("http://localhost:8080/api/login");

      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
      });
      return true;
    } catch (error) {
      // Token tidak valid atau expired
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];

      set({
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      });

      return false;
    }
  },

  // Fungsi untuk update state user
  setUser: (user) => set({ user }),

  // Reset error message
  clearError: () => set({ error: null }),
}));
