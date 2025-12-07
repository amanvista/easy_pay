// src/api/apiClients.js
import axios from "axios";
import appConfig from "../config/appConfig";

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

const {AUTH_URL, ADDRESS_URL, RESTAURANT_URL, MEDIA_URL, ORDER_URL} = appConfig
export const authApi = createApi(AUTH_URL)
export const addressApi = createApi(ADDRESS_URL);
export const restaurantApi = createApi(RESTAURANT_URL);
export const mediaApi = createApi(MEDIA_URL);
export const orderApi = createApi(ORDER_URL);
