import { axiosInstance } from "@/lib/axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { logout } from "./features/auth/authSlice";

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
    async ({ url, method, data, params, headers }, api) => {
      try {
        const state = api.getState() as { auth?: { token?: string } };
        const token = state?.auth?.token;

        const requestHeaders = {
          ...headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const result = await axiosInstance({
          url: url,
          method,
          data,
          params,
          headers: requestHeaders,
        });
        return { data: result.data };
      } catch (axiosError) {
        const err = axiosError as AxiosError;

        // if (err.response?.status === 401) {
        //   api.dispatch(logout());
        // }

        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        };
      }
    };

export default axiosBaseQuery;
