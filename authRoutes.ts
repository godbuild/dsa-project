import express from "express";
import { register, login } from "../controllers/authController";
import { verifyAccount, requestPasswordReset, resetPassword } from "../controllers/authController";

router.get("/verify", verifyAccount);
router.post("/request-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;