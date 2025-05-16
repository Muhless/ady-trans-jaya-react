import { create } from "zustand";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";
const USER_KEY = "auth_user";
const SESSION_TYPE_KEY = "auth_session_type";

export const SESSION_TYPES = {
  PERSISTENT: "persistent",
  TEMPORARY: "temporary",
};

export const useAuthStore = create((set, get) => ({
  token: null,
  refreshToken: null,
  user: null,
  role: null,

  isAuthenticated: false,
  isLoading: true,
  sessionType: SESSION_TYPES.TEMPORARY,

  setToken: (token) => set({ token }),
  setRole: (role) => set({ role }),

  setSessionType: (type) => {
    set({ sessionType: type });
    localStorage.setItem(SESSION_TYPE_KEY, type);
  },

  setUser: (user) => {
    set({ user, role: user?.role || null, isAuthenticated: !!user });
  },

  setTokens: (token, refreshToken = null) => {
    set({ token, refreshToken, isAuthenticated: !!token });

    const storage =
      get().sessionType === SESSION_TYPES.PERSISTENT
        ? localStorage
        : sessionStorage;

    if (token) {
      storage.setItem(TOKEN_KEY, token);
      try {
        const decoded = jwtDecode(token);
        storage.setItem(USER_KEY, JSON.stringify(decoded));
        set({ role: decoded.role || null });
      } catch (error) {
        console.error("Error decoding token:", error);
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

  login: async (username, password, API_BASE_URL, rememberMe = false) => {
    try {
      const sessionType = rememberMe
        ? SESSION_TYPES.PERSISTENT
        : SESSION_TYPES.TEMPORARY;
      get().setSessionType(sessionType);

      const res = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password,
      });
      const { token, refreshToken, user } = res.data;

      get().setUser(user);
      get().setTokens(token, refreshToken);

      return { success: true, data: res.data };
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err);
      return {
        success: false,
        error: err.response?.data?.message || "Username atau password salah",
      };
    }
  },

  logout: () => {
    set({
      token: null,
      refreshToken: null,
      user: null,
      role: null,
      isAuthenticated: false,
    });

    [localStorage, sessionStorage].forEach((storage) => {
      storage.removeItem(TOKEN_KEY);
      storage.removeItem(REFRESH_TOKEN_KEY);
      storage.removeItem(USER_KEY);
      storage.removeItem(SESSION_TYPE_KEY);
    });

    get().clearStorage();
    window.location.href = "/login";
  },

  refreshSession: async (API_BASE_URL) => {
    const storage =
      get().sessionType === SESSION_TYPES.PERSISTENT
        ? localStorage
        : sessionStorage;
    const refreshToken = storage.getItem(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      get().logout();
      return false;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/refresh-token`, {
        refreshToken,
      });
      const { token, newRefreshToken } = res.data;

      get().setTokens(token, newRefreshToken || refreshToken);
      return true;
    } catch (err) {
      console.error("Token refresh failed:", err);
      get().logout();
      return false;
    }
  },

  checkAuth: () => {
    set({ isLoading: true });

    const storedSessionType =
      localStorage.getItem(SESSION_TYPE_KEY) ||
      sessionStorage.getItem(SESSION_TYPE_KEY) ||
      SESSION_TYPES.TEMPORARY;

    const storage =
      storedSessionType === SESSION_TYPES.PERSISTENT
        ? localStorage
        : sessionStorage;

    set({ sessionType: storedSessionType });

    const token = storage.getItem(TOKEN_KEY);
    const refreshToken = storage.getItem(REFRESH_TOKEN_KEY);
    let user = null;
    let role = null;

    try {
      const userJson = storage.getItem(USER_KEY);
      if (userJson) {
        user = JSON.parse(userJson);
        role = user?.role || null;
      }
    } catch (error) {
      console.error("Error decoding or validating token in checkAuth:", error);
    }

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          set({
            token,
            refreshToken,
            user,
            role,
            isAuthenticated: true,
            isLoading: false,
          });
          return;
        }
      } catch (error) {
        console.error("Error validating token:", error);
      }
    }

    set({
      token: null,
      refreshToken: null,
      user: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  setupAxiosInterceptors: (API_BASE_URL) => {
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

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const refreshed = await get().refreshSession(API_BASE_URL);
          if (refreshed) {
            originalRequest.headers.Authorization = `Bearer ${get().token}`;
            return axios(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );
  },
}));

export const checkRouteAuth = (navigate, authRequired = true) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore.getState();
  const location = window.location.pathname;

  if (isLoading) {
    checkAuth();
    return;
  }

  if (authRequired && !isAuthenticated) {
    navigate("/login");
  } else if (!authRequired && isAuthenticated && location === "/login") {
    navigate("/");
  }
};

export const getStorageForSession = () => {
  const sessionType = useAuthStore.getState().sessionType;
  return sessionType === SESSION_TYPES.PERSISTENT
    ? localStorage
    : sessionStorage;
};
