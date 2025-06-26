import express from "express";
import { createPosts, getAllPosts, getSpecificPost, updatePost, deletePost } from "../controllers/postController";
import { loginUser, signupUser } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

// Authentication routes 
router.post("/login", loginUser)
router.post("/signup", signupUser)

// Post routes
router.get("/posts", authMiddleware, getAllPosts)
router.get("/posts/:id", authMiddleware, getSpecificPost)
router.post("/posts", authMiddleware, createPosts)
router.put("/posts/:id", authMiddleware, updatePost)
router.delete("/posts/:id", authMiddleware, deletePost)

export default router;