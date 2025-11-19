// src/api/apiClients.js
import axios from "axios";

const createApi = (baseURL) => {
  const client = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
  });

  // 🔒 Attach JWT token to all requests
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 🚨 Handle invalid or expired tokens (401 responses)
  client.interceptors.response.use(
    (response) => response, // just pass the successful response
    (error) => {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        console.warn("⚠️ Token expired or invalid. Redirecting to login...");
        localStorage.removeItem("token");

        // Prevent infinite loop if already on login page
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

export const authApi = createApi("http://localhost:3003/auth");
export const restaurantApi = createApi("http://localhost:3004");
export const mediaApi = createApi("http://localhost:3002");
export const orderApi = createApi("http://localhost:3005");
