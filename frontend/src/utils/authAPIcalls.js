import axios from "axios";

export const authApi = axios.create({
  baseURL: "",
  withCredentials: true,
});

export const loginUser = async (email, password) => {
    try {
        const res = await authApi.post("/auth/login", {
            "email": email,
            "password": password
        })
        return res.data;
    } catch (err) {
        console.error("Login failed:", err);
        throw err;
    }
};
export const registerUser = async (username, email, password) => {
    try {
        const res = await authApi.post("/auth/signup", {
            "username": username,
            "email": email,
            "password": password
        })
        return res.data;
    } catch (err) {
        console.error("Registration failed:", err);
        throw err;
    }
};


export const logout = async () => {
  try {
    await authApi.post("/auth/logout");
  } catch (err) {
    console.error("Logout failed:", err);
    throw err;
  }
};

export const refreshToken = async () => {
    try {
        const res = await authApi.post("/auth/refresh-token");
        return res.data;
    } catch (err) {
        console.error("Refresh token failed:", err);
        throw err;
    }
};