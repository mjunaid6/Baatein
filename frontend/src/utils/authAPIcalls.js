import api from "../auth/api";

export const loginUser = async (email, password) => {
    try {
        const res = await api.post("/auth/login", {
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
        const res = await api.post("/auth/signup", {
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
    await api.post("/auth/logout");
  } catch (err) {
    console.error("Logout failed:", err);
    throw err;
  }
};

export const refreshToken = async () => {
    try {
        const res = await api.post("/auth/refresh-token");
        return res.data;
    } catch (err) {
        console.error("Refresh token failed:", err);
        throw err;
    }
};