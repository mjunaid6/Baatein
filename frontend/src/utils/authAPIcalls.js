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
