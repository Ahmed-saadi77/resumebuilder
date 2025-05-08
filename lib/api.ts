import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set Authorization header manually
export const setAuthHeader = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Optional: Load token from localStorage (used at app start)
export const initAuthHeader = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    setAuthHeader(token);
  }
};

// Automatically add token from localStorage on every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized – redirecting or logging out");
      // Optional: add logout or redirect logic here
    }
    return Promise.reject(error);
  }
);

// Initialize token on app start
initAuthHeader();

export default api;
