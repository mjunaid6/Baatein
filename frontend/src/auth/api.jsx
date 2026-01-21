import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
})

api.interceptors.response.use(
  res => res,
  async error => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const resp = await api.post("/refresh-token");
      setAccessToken(resp.data.accessToken);

      original.headers.Authorization =
        `Bearer ${resp.data.accessToken}`;

      return api(original);
    }

    return Promise.reject(error);
  }
);


export default api;