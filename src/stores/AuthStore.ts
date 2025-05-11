import axios from "axios";
import { create } from "zustand";
import { API_BASE_URL } from "../apiConfig";

interface User {
  id: number;
  username: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setRole: (role: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password,
      });

      const { token, user } = response.data;
      const role = user.role;

      // Simpan token dan role di Zustand
      set({
        token: token,
        role: role,
        isAuthenticated: true,
        user: user,
        error: null,
      });

      // Simpan token dan role di localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Set token di header global axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Login gagal.",
        isAuthenticated: false,
        token: null,
        user: null,
        role: null,
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    delete axios.defaults.headers.common["Authorization"];

    set({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      error: null,
    });
  },

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setRole: (role) => set({ role }),
}));
