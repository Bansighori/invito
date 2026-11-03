import axios from "axios";

const adminApi = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD
      ? "/api"
      : "http://localhost:5000/api"),
});

adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("invitoAdminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default adminApi;