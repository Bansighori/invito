import axios from "axios";

const PUBLIC_AUTH_PATHS = [
  "/auth/login",
  "/auth/register",
  "/auth/send-register-otp",
  "/auth/verify-register-otp",
  "/auth/send-forgot-password-otp",
  "/auth/verify-forgot-password-otp",
  "/auth/reset-password",
  "/admin/auth/login"
];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api"
});

api.interceptors.request.use(
  (config) => {
    const url = config.url || "";

    // Public authentication routes
    const isPublicAuthRoute =
      PUBLIC_AUTH_PATHS.some((path) =>
        url.includes(path)
      );

    if (isPublicAuthRoute) {
      delete config.headers.Authorization;
      return config;
    }

    // Admin APIs
    if (url.startsWith("/admin/")) {
      const adminToken =
        localStorage.getItem(
          "invitoAdminToken"
        );

      if (adminToken) {
        config.headers.Authorization =
          `Bearer ${adminToken}`;
      }

      return config;
    }

    // Customer APIs
    const token =
      localStorage.getItem(
        "invitoToken"
      );

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