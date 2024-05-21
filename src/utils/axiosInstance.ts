import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://192.168.29.21:2500/api/user", // 
  headers: {
    "Content-Type": "application/json",
  },
});
interface MyResponseData {
  // response
}

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authToken = JSON.parse(localStorage.getItem("token"));
    console.log(authToken, "authToken")
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken?.token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<MyResponseData>) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access. Redirecting to login page.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
