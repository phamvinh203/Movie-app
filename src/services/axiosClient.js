import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://phimapi.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor cho response
axiosClient.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.data);
    return response.data;
  },
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;