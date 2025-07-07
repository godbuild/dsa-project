import api from "./axios";

export const getAllUsers = () => api.get("/admin/users");
export const getAllRequests = () => api.get("/admin/requests");
export const getAllSessions = () => api.get("/admin/sessions");
export const assignRole = (userId: string, role: string) =>
  api.post("/admin/assign-role", { userId, role });