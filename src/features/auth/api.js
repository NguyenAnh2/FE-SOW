import apiClient from "../../services/apiClient";

export const loginApi = async (data) => {
  return apiClient.post("/auth/signin", data).then(res => res.data);
};
