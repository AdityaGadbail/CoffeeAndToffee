import apiClient from "./apiClient";

export const createSupport = async (supportData) => {
  const response = await apiClient.post("/support/create", supportData);

  return response.data;
};

export const getCreatorSupports = async (creatorId) => {
  const response = await apiClient.get(`/support/creator/${creatorId}`);

  return response.data;
};

export const getMySupports = async () => {
  const response = await apiClient.get("/support/my-supports");

  return response.data;
};