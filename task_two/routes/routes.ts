const express = require("express")
const router = express.Router();
import { getProfile, loginUser, signupUser } from "../controllers/authController"
import authMiddleware from "../middleware/authMiddleware";
router.post("/register", signupUser)
router.post("/login", loginUser)
router.get("/profile", authMiddleware, getProfile)

export default router;