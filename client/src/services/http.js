import axios from "axios";

const ACCESS_TOKEN_KEY = "tbc_access_token";

const rawBaseURL =
  import.meta.env.VITE_BACKEND_API ||
  (import.meta.env.DEV ? "http://localhost:5000" : "");
const normalizedBaseURL = rawBaseURL.replace(/\/$/, "");
const baseURL = normalizedBaseURL
  ? normalizedBaseURL.endsWith("/api/v1")
    ? normalizedBaseURL
    : `${normalizedBaseURL}/api/v1`
  : "/api/v1";

const http = axios.create({
  baseURL,
  withCredentials: true,
});

export const setAccessToken = (token) => {
  // Auth now relies on HTTP-only cookies. Keep this for backward compatibility
  // with existing imports, but only clear any legacy localStorage token.
  const nextToken = token || null;
  if (typeof window !== "undefined") {
    if (nextToken) {
      window.localStorage.setItem(ACCESS_TOKEN_KEY, nextToken);
    } else {
      window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  }
};

export const clearAccessToken = () => {
  setAccessToken(null);
};

let isRefreshing = false;
let pendingQueue = [];

const processQueue = () => {
  pendingQueue.forEach((resolve) => resolve());
  pendingQueue = [];
};

http.interceptors.response.use(
  (response) => {
    const url = response?.config?.url || "";
    if (url.includes("/auth/logout")) {
      clearAccessToken();
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    if (
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/refresh")
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

      const { data } = await axios.post(
        `${baseURL}/auth/refresh`,
        {},
        { withCredentials: true },
      );

      void data;

      processQueue();
      return http(originalRequest);
    } catch (refreshError) {
      clearAccessToken();
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
