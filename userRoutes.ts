import express from "express";
import { getProfile, updateProfile, findMentors } from "../controllers/userController";
import { auth } from "../middlewares/authMiddleware";
const router = express.Router();

router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.get("/mentors", findMentors);

export default router;