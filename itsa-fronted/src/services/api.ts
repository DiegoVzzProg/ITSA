import axios, { AxiosInstance } from 'axios';
import Cookies from "js-cookie";

const api: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    // responseType: 'blob'
    // withCredentials: true,
});

api.interceptors.request.use(
    async (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;