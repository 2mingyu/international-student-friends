import axiosInstance from "@services/axiosInstance";

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post(`/api/v1/auth/login`, {
    username: email,
    password: password,
  });

  return response.data;
};
