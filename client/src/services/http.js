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

let accessToken =
  typeof window !== "undefined"
    ? window.localStorage.getItem(ACCESS_TOKEN_KEY)
    : null;

export const setAccessToken = (token) => {
  accessToken = token || null;
  if (typeof window !== "undefined") {
    if (accessToken) {
      window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
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

http.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers || {};
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

http.interceptors.response.use(
  (response) => {
    const url = response?.config?.url || "";
    const tokenFromResponse = response?.data?.accessToken;

    if (
      tokenFromResponse &&
      (url.includes("/auth/login") || url.includes("/auth/refresh"))
    ) {
      setAccessToken(tokenFromResponse);
    }

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

      if (data?.accessToken) {
        setAccessToken(data.accessToken);
      }

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
