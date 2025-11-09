import api from "./api/api";

const ENDPOINT = {
  login: "account/authenticate",
  forgotPassword: "/send-otp",
  resetPassword: "/reset-password",
  register: "/register",
};

const login = async (payload) => {
  const res = await api.post(ENDPOINT.login, payload);
  return res?.data;
};

const authService = {
  login,
};

export default authService;
