import { api } from "./api";

export const createUser = async (username: string, password: string) => {
  const response = await api.post("/user/create", {
    username,
    password,
  });
  return response;
};

export const getUserData = async () => {
  const response = await api.get("/user");
  return response;
};

export const listUsers = async () => {
  const response = await api.get("/user/list");
  return response;
};
