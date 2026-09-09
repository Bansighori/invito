import api from "./axios";
import publicApi from "./publicApi";

export const login = (credentials) =>
  publicApi.post("/auth/login", credentials);

export const register = (userData) =>
  publicApi.post("/auth/register", userData);

export const updateProfile = (profileData) =>
  api.put("/auth/profile", profileData);

export const changePassword = (passwordData) =>
  api.put("/auth/change-password", passwordData);
