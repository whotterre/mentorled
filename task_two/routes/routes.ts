const express = require("express")
const router = express.Router();
import { loginUser, signupUser } from "../controllers/authController"
router.post("/register", signupUser)
router.post("/login", loginUser)
router.get("/profile", () => { })

export default router;