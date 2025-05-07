import { AxiosRequestConfig } from "axios"
import { useAxiosPost } from "../../../../hooks/useAxios";
const AUTH_API_BASE_PATH = "/auth";

export const useLoginUserApi = () => {
    // ** custom Hooks **
    const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();
  
    const loginUserApi = async (
      data: object,
      config: AxiosRequestConfig<object> = {}
    ) => {
      return callApi(`${AUTH_API_BASE_PATH}/register`, data, config);
    };
  
    return { loginUserApi, isLoading, isError, isSuccess };
  };