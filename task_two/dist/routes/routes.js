"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const authController_1 = require("../controllers/authController");
router.post("/register", authController_1.signupUser);
router.post("/login", authController_1.loginUser);
router.get("/profile", () => { });
exports.default = router;
