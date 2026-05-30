import apiClient from "./apiClient";

export const getCreators = async (search = "") => {
  const response = await apiClient.get("/users", {
    params: search ? { search } : {},
  });

  return response.data;
};

export const getCreatorByUsername = async (username) => {
  const response = await apiClient.get(`/users/${username}`);

  return response.data;
};

export const updateMyProfile = async (formData) => {
  const response = await apiClient.put("/users/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};