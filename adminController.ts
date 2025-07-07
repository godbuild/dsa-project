import { Request, Response } from "express";
import User from "../models/User";
import MentorshipRequest from "../models/MentorshipRequest";
import Session from "../models/Session";

// View all users
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// View all requests
export const getAllRequests = async (req: Request, res: Response) => {
  const requests = await MentorshipRequest.find().populate("mentee mentor");
  res.json(requests);
};

// View all sessions
export const getAllSessions = async (req: Request, res: Response) => {
  const sessions = await Session.find().populate("mentee mentor");
  res.json(sessions);
};

// Assign user role
export const assignRole = async (req: Request, res: Response) => {
  const { userId, role } = req.body;
  const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select("-password");
  res.json(user);
  import AuditLog from "../models/AuditLog";
import { AuthRequest } from "../middlewares/authMiddleware";
await AuditLog.create({
  adminId: (req as AuthRequest).user?.userId,
  action: "assign-role",
  details: `Assigned role ${role} to user ${userId}`,
});
};

export const getAllSessions = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, sort = "scheduledFor" } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const sessions = await Session.find()
    .populate("mentee mentor")
    .sort({ [sort as string]: 1 })
    .skip(skip)
    .limit(Number(limit));
  const total = await Session.countDocuments();
  res.json({ sessions, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
};

