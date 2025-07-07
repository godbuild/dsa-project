import { Request, Response } from "express";
import MentorshipRequest from "../models/MentorshipRequest";
import Session from "../models/Session";
import User from "../models/User";
import { AuthRequest } from "../middlewares/authMiddleware";

// Mentee sends mentorship request
export const sendRequest = async (req: AuthRequest, res: Response) => {
  const { mentorId } = req.body;
  const request = await MentorshipRequest.create({
    mentee: req.user?.userId,
    mentor: mentorId,
  });
  res.status(201).json(request);
  const mentor = await User.findById(mentorId);
if (mentor) {
  await sendEmail(
    mentor.email,
    "New Mentorship Request",
    `<p>You have a new mentorship request from ${req.user?.userId}.</p>`
  );
}
};


// Mentor accepts/rejects request
export const respondRequest = async (req: AuthRequest, res: Response) => {
  const { requestId, action } = req.body; // action: 'accept' | 'reject'
  const request = await MentorshipRequest.findById(requestId);
  if (!request || request.mentor.toString() !== req.user?.userId) {
    return res.status(404).json({ message: "Request not found" });
  }
  request.status = action === "accept" ? "accepted" : "rejected";
  await request.save();
  res.json(request);
};

// Book session (mentee books with mentor)
export const bookSession = async (req: AuthRequest, res: Response) => {
  const { mentorId, scheduledFor } = req.body;
  const session = await Session.create({
    mentor: mentorId,
    mentee: req.user?.userId,
    scheduledFor,
  });
  res.status(201).json(session);
};

// Mentor/mentee leaves feedback
export const leaveFeedback = async (req: AuthRequest, res: Response) => {
  const { sessionId, feedback, rating } = req.body;
  const session = await Session.findById(sessionId);
  if (!session || (session.mentee.toString() !== req.user?.userId && session.mentor.toString() !== req.user?.userId)) {
    return res.status(404).json({ message: "Session not found" });
  }
  session.feedback = feedback;
  session.rating = rating;
  session.status = "completed";
  await session.save();
  res.json(session);
};