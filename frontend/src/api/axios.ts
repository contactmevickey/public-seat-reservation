import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url ?? "";

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !requestUrl.includes("/auth/login") &&
      !requestUrl.includes("/auth/refresh")
    ) {

      const refreshToken =
        localStorage.getItem(
          "refreshToken"
        );

      if (!refreshToken) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      const response =
        await axios.post(
          "http://localhost:3000/auth/refresh",
          {
            refreshToken,
          }
        );

      const {
        accessToken,
        refreshToken: newRefreshToken
      } = response.data;

      localStorage.setItem(
        "accessToken",
        accessToken
      );

      localStorage.setItem(
        "refreshToken",
        newRefreshToken
      );

      originalRequest.headers =
        originalRequest.headers ?? {};

      originalRequest.headers.Authorization =
        `Bearer ${accessToken}`;
      return api(originalRequest);
    }

  return Promise.reject(error);
});

export default api;
