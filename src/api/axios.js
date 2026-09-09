import axios from "axios";

const PUBLIC_AUTH_PATHS = [
  "/auth/login",
  "/auth/register"
];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api"
});

api.interceptors.request.use(
  (config) => {
    const isPublicAuthRoute =
      PUBLIC_AUTH_PATHS.some((path) =>
        config.url?.includes(path)
      );

    if (isPublicAuthRoute) {
      delete config.headers.Authorization;
      return config;
    }

    const token =
      localStorage.getItem("invitoToken");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;