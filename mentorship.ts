import api from "./axios";

export const sendRequest = (mentorId: string) =>
  api.post("/mentorship/request", { mentorId });

export const respondRequest = (requestId: string, action: "accept" | "reject") =>
  api.post("/mentorship/request/respond", { requestId, action });

export const bookSession = (mentorId: string, scheduledFor: string) =>
  api.post("/mentorship/session", { mentorId, scheduledFor });

export const leaveFeedback = (sessionId: string, feedback: string, rating: number) =>
  api.post("/mentorship/session/feedback", { sessionId, feedback, rating });