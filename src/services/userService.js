import api from "./api/api";

const ENDPOINT = {
  user: "CompanyMembers",
};

const getUser = async (params) => {
  const res = api.get(ENDPOINT.user, { params });
  return res;
};

const userService = {
  getUser,
};

export default userService;
