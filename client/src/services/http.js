import axios from "axios";

const rawBaseURL = import.meta.env.VITE_BACKEND_API || "http://localhost:5000";
const normalizedBaseURL = rawBaseURL.replace(/\/$/, "");
const baseURL = normalizedBaseURL.endsWith("/api/v1") ? normalizedBaseURL : `${normalizedBaseURL}/api/v1`;

const http = axios.create({
  baseURL,
  withCredentials: true,
});

let isRefreshing = false;
let pendingQueue = [];

const processQueue = () => {
  pendingQueue.forEach((resolve) => resolve());
  pendingQueue = [];
};

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    if (
      originalRequest?.url?.includes("/auth/login")
      || originalRequest?.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    if (status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      await new Promise((resolve) => pendingQueue.push(resolve));
      return http(originalRequest);
    }

    try {
      isRefreshing = true;
      originalRequest._retry = true;

      await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });

      processQueue();
      return http(originalRequest);
    } catch (refreshError) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:unauthorized"));
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default http;
