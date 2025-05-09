import { API_BASE_URL } from "./../apiConfig";
import { create } from "zustand";
import axios from "axios";
import useNavigationHooks from "../hooks/useNavigation";
import { useState } from "react";

interface User {
  id: number;
  username: string;
  name?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  role: string | null;  // Added role to the state
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  setUser: (User: User) => void;
  setRole: (role: string) => void;  // Added function to set role
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,  // Initialize from localStorage
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });
  
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, {
        username,
        password,
      });
  
      const userData = response.data.user;
      const token = response.data.token;
      const role = userData.role;  // Get role from userData
  
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
  
      set({
        isLoading: false,
        isAuthenticated: true,
        user: userData,
        token: token,
        role: role,  // Set role in the state
        error: null,
      });
  
      // Log state setelah login berhasil
      console.log("Login berhasil! Auth State:", {
        user: userData,
        role: role,
        isAuthenticated: true
      });
  
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login gagal. Silakan coba lagi.";
  
      set({
        isLoading: false,
        error: errorMessage,
        isAuthenticated: false,
        token: null,
        user: null,
        role: null,  // Clear role on login error
      });
  
      return false;
    }
  },
  
  logout: () => {
    console.log("Logging out...");
    console.log("Before logout - Auth state:", get());
    
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    delete axios.defaults.headers.common["Authorization"];

    set({
      user: null,
      token: null,
      role: null,  // Clear role on logout
      isAuthenticated: false,
      error: null,
    });
    
    console.log("After logout - Auth state:", get());
    window.location.href = "/login";
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    console.log("Checking auth with token:", token ? "exists" : "none");
    console.log("Current role from localStorage:", role);

    if (!token) {
      set({ isAuthenticated: false, user: null, role: null });
      console.log("Auth check failed: No token found");
      return false;
    }

    try {
      // Tambahkan token ke header request
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Ganti URL API sesuai dengan endpoint untuk validasi token
      // const response = await axios.get(`${API_BASE_URL}/user`);
      const response = await axios.get(`${API_BASE_URL}/users`);
      
      const userData = response.data.user;
      const userRole = userData.role || role;
      
      if (userRole !== role) {
        localStorage.setItem("role", userRole);
      }

      set({
        isAuthenticated: true,
        user: userData,
        role: userRole, 
        error: null,
      });
      
      console.log("Auth check successful! Current state:", {
        user: userData,
        role: userRole,
        isAuthenticated: true
      });
      
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      delete axios.defaults.headers.common["Authorization"];

      set({
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,  // Clear role on auth error
        error: null,
      });

      return false;
    }
  },

  // Fungsi untuk update state user
  setUser: (user) => {
    set({ user });
    console.log("User updated:", user);
  },
  
  // Fungsi untuk update state role
  setRole: (role) => {
    localStorage.setItem("role", role);
    set({ role });
    console.log("Role diperbarui:", role);
    console.log("Current auth state:", get());
  },

  // Reset error message
  clearError: () => set({ error: null }),
}));