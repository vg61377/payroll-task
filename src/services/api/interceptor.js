import toast from "react-hot-toast";
import { getToken } from "../../utils/constants";

export function interceptor(axiosInstance) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Basic ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,

    (error) => {
      console.log("error", error?.response);

      const { status, errormessage } = error.response;

      switch (status) {
        case 400:
          toast.error(errormessage || "Bad Request");
          break;

        case 401:
          localStorage.removeItem("token");
          window.location.href("/login");
          toast.error(errormessage || "Unauthorized – Redirecting to login...");
          break;

        case 403:
          toast.error(errormessage || "Forbidden – You do not have permission.");
          break;

        case 404:
          toast.error(errormessage || "Not Found – The resource does not exist.");
          break;

        case 500:
          toast.error(errormessage || "Server Error – Please try again later.");
          break;

        default:
          toast.error(errormessage || `Unhandled error (status: ${status})`);
          break;
      }
    }
  );
}
