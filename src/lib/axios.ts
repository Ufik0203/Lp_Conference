import axios from "axios";
import { API_URL } from "@/env";

const api = axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: API_URL,
});

export default api;
