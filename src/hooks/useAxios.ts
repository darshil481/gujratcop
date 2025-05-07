import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import Axios from "../components/axios";


export type ApiResponse = {
  data: any;
  message: string;
  toast: boolean;
  responseType: string;
};

export const useAxiosGet = (): [
  (
    url: string,
    config?: AxiosRequestConfig<object>,
    baseUrl?: boolean
  ) => Promise<{ data?: any; error?: any }>,
  { isLoading: boolean; isError: boolean; isSuccess: boolean }
] => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getRequest = async (
    url: string,
    config: AxiosRequestConfig = {},
    baseUrl = true
  ) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);

      const response = await (baseUrl
        ? Axios.get(url, { ...config })
        : axios.get(url, { ...config }));

      setIsLoading(false);
      setIsSuccess(true);

      return { data: response.data };
    } catch (error: any) {
      setIsError(true);
      setIsLoading(false);

      const typedError = error?.response?.data as Partial<ApiResponse>;

      return {
        error: typedError?.message || error.message || "Unknown error",
        data: typedError?.data || null,
      };
    }
  };

  return [getRequest, { isLoading, isError, isSuccess }];
};
export const useAxiosPost = (): [
  (
    url: string,
    data: object | string,
    config?: AxiosRequestConfig<object>
  ) => Promise<{ data?: any; error?: any }>,
  { isLoading: boolean; isError: boolean; isSuccess: boolean }
] => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const postRequest = async (
    url: string,
    data: object | string,
    config: AxiosRequestConfig<object> = {}
  ) => {
    try {
      setIsSuccess(false);
      setIsLoading(true);
      const response = await Axios.post(url, data, { ...config });
      setIsLoading(false);
      setIsSuccess(true);
      return { data: response.data };
    } catch (error: any) {
      setIsError(true);
      setIsLoading(false);

      const typedError = error?.response?.data as Partial<ApiResponse>;

      return {
        error: typedError?.message || error.message || "Unknown error",
        data: typedError?.data || null,
      };
    }
  };

  return [postRequest, { isLoading, isError, isSuccess }];
};
