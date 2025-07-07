import api from "./axios";

export const getProfile = () => api.get("/user/profile");
export const updateProfile = (data: any) => api.put("/user/profile", data);
export const findMentors = (skill?: string) =>
  api.get("/user/mentors", { params: skill ? { skill } : {} });