// auth.js - File untuk menyimpan store dan utilitas autentikasi
import { create } from 'zustand';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Pastikan untuk menginstal: npm install jwt-decode

// Buat konstanta untuk nama key di localStorage/sessionStorage
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_KEY = 'auth_user';
const SESSION_TYPE_KEY = 'auth_session_type';

// Konstanta untuk tipe session
export const SESSION_TYPES = {
  PERSISTENT: 'persistent', // Menggunakan localStorage - bertahan setelah browser ditutup
  TEMPORARY: 'temporary',   // Menggunakan sessionStorage - hilang setelah browser ditutup
};

// Membuat Zustand store untuk autentikasi
export const useAuthStore = create((set, get) => ({
  token: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
  sessionType: SESSION_TYPES.TEMPORARY, // Default ke session sementara

  setSessionType: (type) => {
    set({ sessionType: type });
    sessionStorage.setItem(SESSION_TYPE_KEY, type);
    localStorage.setItem(SESSION_TYPE_KEY, type);
  },

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  setTokens: (token, refreshToken = null) => {
    set({ token, refreshToken, isAuthenticated: !!token });
    
    // Simpan ke storage yang sesuai berdasarkan tipe session
    const storage = get().sessionType === SESSION_TYPES.PERSISTENT ? localStorage : sessionStorage;
    
    if (token) {
      storage.setItem(TOKEN_KEY, token);
      // Juga simpan user data dari token
      try {
        const decoded = jwtDecode(token);
        storage.setItem(USER_KEY, JSON.stringify(decoded));
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      storage.removeItem(TOKEN_KEY);
      storage.removeItem(USER_KEY);
    }

    if (refreshToken) {
      storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } else {
      storage.removeItem(REFRESH_TOKEN_KEY);
    }
  },

  // Login handler
  login: async (username, password, API_BASE_URL, rememberMe = false) => {
    try {
      // Set tipe session berdasarkan pilihan "Remember me"
      const sessionType = rememberMe ? SESSION_TYPES.PERSISTENT : SESSION_TYPES.TEMPORARY;
      get().setSessionType(sessionType);
      
      const res = await axios.post(`${API_BASE_URL}/login`, { username, password });
      const { token, refreshToken, user } = res.data;
      
      get().setUser(user);
      get().setTokens(token, refreshToken);
      
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err);
      return {
        success: false,
        error: err.response?.data?.message || "Username atau password salah"
      };
    }
  },

  // Logout handler
  logout: () => {
    // Hapus dari store
    set({ token: null, refreshToken: null, user: null, isAuthenticated: false });
    
    // Hapus dari localStorage dan sessionStorage
    [localStorage, sessionStorage].forEach(storage => {
      storage.removeItem(TOKEN_KEY);
      storage.removeItem(REFRESH_TOKEN_KEY);
      storage.removeItem(USER_KEY);
    });
    
    // Redirect ke halaman login
    window.location.href = "/login";
  },

  // Refresh token
  refreshSession: async (API_BASE_URL) => {
    const storage = get().sessionType === SESSION_TYPES.PERSISTENT ? localStorage : sessionStorage;
    const refreshToken = storage.getItem(REFRESH_TOKEN_KEY);
    
    if (!refreshToken) {
      get().logout();
      return false;
    }
    
    try {
      const res = await axios.post(`${API_BASE_URL}/refresh-token`, { refreshToken });
      const { token, newRefreshToken } = res.data;
      
      get().setTokens(token, newRefreshToken || refreshToken);
      return true;
    } catch (err) {
      console.error("Token refresh failed:", err);
      get().logout();
      return false;
    }
  },

  // Cek status autentikasi, load data dari storage
  checkAuth: () => {
    set({ isLoading: true });
    
    // Cek tipe session dari storage
    const storedSessionType = localStorage.getItem(SESSION_TYPE_KEY) || 
                              sessionStorage.getItem(SESSION_TYPE_KEY) || 
                              SESSION_TYPES.TEMPORARY;
    
    // Pilih storage berdasarkan tipe session
    const storage = storedSessionType === SESSION_TYPES.PERSISTENT ? localStorage : sessionStorage;
    
    // Set tipe session pada store
    set({ sessionType: storedSessionType });
    
    // Coba ambil token dan user dari storage
    const token = storage.getItem(TOKEN_KEY);
    const refreshToken = storage.getItem(REFRESH_TOKEN_KEY);
    let user = null;
    
    try {
      const userJson = storage.getItem(USER_KEY);
      if (userJson) {
        user = JSON.parse(userJson);
      }
    } catch (error) {
      console.error('Error parsing stored user:', error);
    }
    
    // Jika token ada, verifikasi apakah masih valid
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        // Jika token masih valid
        if (decoded.exp > currentTime) {
          set({ 
            token, 
            refreshToken, 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return;
        }
      } catch (error) {
        console.error('Error validating token:', error);
      }
    }
    
    // Token tidak valid atau tidak ada
    set({ token: null, refreshToken: null, user: null, isAuthenticated: false, isLoading: false });
  },
  
  // Setup axios interceptors untuk otomatis menambahkan token dan handle 401
  setupAxiosInterceptors: (API_BASE_URL) => {
    // Request interceptor - tambahkan token ke setiap request
    axios.interceptors.request.use(
      (config) => {
        const token = get().token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle refresh token jika 401
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // Jika error 401 (Unauthorized) dan request belum dicoba refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          // Coba refresh token
          const refreshed = await get().refreshSession(API_BASE_URL);
          if (refreshed) {
            // Update token di header dan coba lagi request
            originalRequest.headers.Authorization = `Bearer ${get().token}`;
            return axios(originalRequest);
          }
        }
        
        return Promise.reject(error);
      }
    );
  },
}));

// Utilitas untuk mengecek apakah rute memerlukan autentikasi
export const checkRouteAuth = (navigate, authRequired = true) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore.getState();
  
  // Load autentikasi jika belum
  if (isLoading) {
    checkAuth();
    return;
  }
  
  // Redirect jika status auth tidak sesuai kebutuhan
  if (authRequired && !isAuthenticated) {
    navigate('/login');
  } else if (!authRequired && isAuthenticated) {
    navigate('/');
  }
};

// Export konstanta untuk digunakan di komponen
export const getStorageForSession = () => {
  const sessionType = useAuthStore.getState().sessionType;
  return sessionType === SESSION_TYPES.PERSISTENT ? localStorage : sessionStorage;
};