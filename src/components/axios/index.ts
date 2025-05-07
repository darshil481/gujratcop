// =================== Import Packages ==================
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import moment from "moment";
import { Store } from "@reduxjs/toolkit";

// =================== Import Config & Slices ==========

import { setToast, removeToast } from "../../redux/slices/toastSlice";
import { API_URL } from "../config";

// =============== Axios Instance Creation ==============
export const Axios: AxiosInstance = axios.create({
  baseURL: API_URL,
});

// =============== Setup Axios Interceptors =============
export const setupAxios = (store: Store) => {
  // ----- Request Interceptor -----
  Axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    const authToken = localStorage.getItem("access_token");

    request.headers.set("utcOffset", moment().format("Z"));

    if (window?.Intl) {
      request.headers.set(
        "timezone",
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
    }

    const isJson =
      typeof request.data === "string" ||
      request.data instanceof URLSearchParams;

    request.headers.set(
      "Content-Type",
      isJson ? "application/json" : "multipart/form-data"
    );

    if (authToken) {
      request.headers.set("Authorization", `JWT ${authToken}`);
    }

    return request;
  });

  // ----- Response Interceptor -----
  Axios.interceptors.response.use(
    (response: AxiosResponse) => {
      const { toast } = response.data;
      if (toast && response.data.message) {
        const toastId = Date.now();

        store.dispatch(
          setToast({
            message: response.data.message,
            type: response.data.responseType || "success",
            id: toastId,
          })
        );

        setTimeout(() => {
          store.dispatch(removeToast({ id: toastId }));
        }, 2000);
      }

      return response.data;
    },
    (error) => {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      const responseType = error.response?.data?.responseType || "error";

       // Handle 401 Unauthorized
       if (status === 401) {
        // TODO: Add logout or redirect logic
      }

      // Handle 403 Forbidden
      if (status === 403) {
        // navigateUsingEvent({ route: "/" });
      }

      const isHandledError =
        [0, 400, 401, 403, 405, 500, 503].includes(status);

      if (isHandledError) {
        const toastId = Date.now();
        store.dispatch(
          setToast({
            message,
            type: responseType,
            id: toastId,
          })
        );

        setTimeout(() => {
          store.dispatch(removeToast({ id: toastId }));
        }, 3000);
      }

      throw error.response?.data ?? error.message;
    }
  );
};

export default Axios;
