import apiClient from "../../services/apiClient";

export const getUsersApi = () => apiClient.get("/users/me");
