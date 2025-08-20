// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ use env
});

export default API;
