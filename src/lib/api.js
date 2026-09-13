import axios from "axios";

const rawEnv = (import.meta.env.VITE_API_URL || "").trim().replace(/^["']|["']$/g, "");
const isLocalOrInvalid = !rawEnv || rawEnv.includes("localhost") || rawEnv.includes("192.168.") || rawEnv.includes("127.0.0.1");
const baseURL = isLocalOrInvalid ? "https://i-compters.onrender.com/api" : rawEnv;

const api = axios.create({
    baseURL: baseURL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined" && token !== "null") {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;