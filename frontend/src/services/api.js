import axios from "axios";

const API = axios.create({

  baseURL: import.meta.env.VITE_API_URL,

  headers: {

    "Content-Type": "application/json",

  },

});
export const IMAGE_BASE_URL =
  import.meta.env.VITE_API_URL.replace("/api", "");
  
// Add token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;