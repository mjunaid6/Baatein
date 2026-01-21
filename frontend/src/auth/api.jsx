import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
})

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
        const resp = await api.post("/auth/refresh-token");

        original.headers.Authorization =
          `Bearer ${resp.data.accessToken}`;

        return api(original);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);


export default api;