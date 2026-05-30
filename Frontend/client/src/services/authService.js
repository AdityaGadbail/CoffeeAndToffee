import apiClient from "./apiClient";

export const loginUser = async (credentials) => {
  const response = await apiClient.post("/auth/login", credentials);

  return response.data;
};

export const registerUser = async (formData) => {
  const response = await apiClient.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};