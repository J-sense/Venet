import { config } from "@/config";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error?.config;

    // Handle 401 Unauthorized errors by refreshing token
    if (
      error?.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh/")
    ) {
      originalRequest._retry = true;

      try {
        const { store } = await import("@/redux/store");
        const { logout, setToken } = await import("@/redux/features/auth/authSlice");

        const refreshToken = store.getState().auth.refresh;

        if (refreshToken) {
          // Call refresh endpoint with stored refresh token
          const res = await axiosInstance.post(`${config.baseUrl}/auth/refresh/`, {
            refresh: refreshToken,
          });

          console.log("Token Refresh Response:", res.data.access);

          const newAccessToken =
            res.data?.access

          const newRefreshToken =
            res.data?.refresh ||
            res.data?.data?.refresh ||
            refreshToken;

          if (newAccessToken) {
            // Update Redux state with new access token
            store.dispatch(
              setToken({ token: newAccessToken, refresh: newRefreshToken })
            );

            // Update Authorization header for original failed request & retry
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
        }

        // If no refresh token exists or no new token returned, logout user
        store.dispatch(logout());
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        const { store } = await import("@/redux/store");
        const { logout } = await import("@/redux/features/auth/authSlice");
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  },
);
