import api from "./axios";

export const register = (data: { name: string; email: string; password: string; role: string }) =>
  api.post("/auth/register", data);

export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);