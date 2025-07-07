import express from "express";
import { auth, role } from "../middlewares/authMiddleware";
import { getAllUsers, getAllRequests, getAllSessions, assignRole } from "../controllers/adminController";
const router = express.Router();

router.get("/users", auth, role(["admin"]), getAllUsers);
router.get("/requests", auth, role(["admin"]), getAllRequests);
router.get("/sessions", auth, role(["admin"]), getAllSessions);
router.post("/assign-role", auth, role(["admin"]), assignRole);

export default router;