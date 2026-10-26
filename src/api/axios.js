import axios from "axios";

const PUBLIC_AUTH_PATHS = [
  "/auth/login",
  "/auth/register",
  "/auth/send-register-otp",
  "/auth/verify-register-otp",
  "/auth/send-forgot-password-otp",
  "/auth/verify-forgot-password-otp",
  "/auth/reset-password",
  "/admin/auth/login",
];

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const url = new URL(
      config.url || "",
      config.baseURL || window.location.origin
    ).pathname;

    const isPublicAuthRoute = PUBLIC_AUTH_PATHS.some(
      (path) => url.endsWith(path)
    );

    config.headers = config.headers || {};

    if (isPublicAuthRoute) {
      delete config.headers.Authorization;
      return config;
    }

    if (url.includes("/admin/")) {
      const token = localStorage.getItem("invitoAdminToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    }

    const token = localStorage.getItem("invitoToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
