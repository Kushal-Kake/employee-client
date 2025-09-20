import axios from "axios";
import { config } from "../config/index.ts";

const API_URL = config.baseUrl;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((reqConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    reqConfig.headers.Authorization = `Bearer ${token}`;
  }
  return reqConfig;
});

export default api;
