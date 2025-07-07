import { Request, Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middlewares/authMiddleware";

// Get own profile
export const getProfile = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user?.userId).select("-password");
  res.json(user);
};

// Update own profile
export const updateProfile = async (req: AuthRequest, res: Response) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user?.userId, updates, { new: true }).select("-password");
  res.json(user);
};

// Discover mentors
export const findMentors = async (req: Request, res: Response) => {
  const { skill, page = 1, limit = 10, sort = "name" } = req.query;
  const filter: any = { role: "mentor" };
  if (skill) filter.skills = { $regex: skill, $options: "i" };
  const skip = (Number(page) - 1) * Number(limit);
  const mentors = await User.find(filter)
    .select("-password")
    .sort({ [sort as string]: 1 })
    .skip(skip)
    .limit(Number(limit));
  const total = await User.countDocuments(filter);
  res.json({ mentors, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
};