import axios from "axios";
import { getAccessToken, setToken } from "./authToken";
import { refreshToken } from "../utils/authAPICalls";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async error => {
    const original = error.config;

    if (
      error.response?.status === 401 &&
      !original._retry &&
      !original.url.includes("/auth/refresh-token")
    ) {
      original._retry = true;

      try {
        const data = await refreshToken();
        setToken(data.accessToken);

        original.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(original);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;