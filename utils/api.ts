// utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("authToken"); // or from cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // You can add loading state management here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // You can modify the response structure here
    return response.data;
  },
  (error) => {
    // Handle errors
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";

    // Handle specific status codes
    if (error.response?.status === 401) {
      // Redirect to login or handle unauthorized
      console.warn("Unauthorized access - redirect to login");
    }

    if (error.response?.status === 403) {
      console.warn("Forbidden access");
    }

    // Return consistent error format
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default api;
