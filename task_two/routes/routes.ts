const express = require("express")
const router = express.Router();
import { getProfile, loginUser, signupUser } from "../controllers/authController"
router.post("/register", signupUser)
router.post("/login", loginUser)
router.get("/profile", getProfile)

export default router;