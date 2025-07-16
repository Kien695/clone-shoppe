import axios, { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import {
  clearToLS,
  getAccessTokenToLS,
  saveAccessTokenToLS,
  saveProfileToLS,
} from "./auth";
class Http {
  constructor() {
    // console.log("12434"); nó sẽ in ra 1 lần khi qua trang khác vì constructor chỉ chạy 1 lần duy nhất
    this.accessToken = getAccessTokenToLS();
    this.instance = axios.create({
      baseURL: "https://api-ecom.duthanhduoc.com/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken;
          return config;
        }
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === "/login" || url === "/register") {
          this.accessToken = response.data.data.access_token;
          saveAccessTokenToLS(this.accessToken);
          saveProfileToLS(response.data.data.user);
        } else if (url === "/logout") {
          this.accessToken = "";
          clearToLS();
        }
        return response;
      },
      function (error) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data = error.response?.data;
          const errorMessage = data?.message || "Lỗi không xác định";
          toast.error(errorMessage);
        }
        return Promise.reject(error);
      }
    );
  }
}
const http = new Http().instance;
export default http;
