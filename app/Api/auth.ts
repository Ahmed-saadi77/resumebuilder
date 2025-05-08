
import api, { setAuthHeader } from "@/lib/api";

export interface AuthResponse {
  userId: string;
  email: string;
  token: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

// Login function
export const login = async (credentials: AuthRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", credentials);
  const data = response.data;
  localStorage.setItem("token", data.token);
  setAuthHeader(data.token);
  return data;
};

// Register function
export const register = async (credentials: AuthRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", credentials);
  const data = response.data;
  localStorage.setItem("token", data.token);
  setAuthHeader(data.token);
  return data;
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token");
  setAuthHeader(""); // Clear the Authorization header
};
