import express from "express";
import { createPosts, getAllPosts, getSpecificPost, updatePost, deletePost } from "../controllers/postController";
import { loginUser, signupUser } from "../controllers/userController";

const router = express.Router();

// Authentication routes 
router.post("/login", loginUser)
router.post("/signup", signupUser)

// Post routes
router.get("/posts", getAllPosts)
router.get("/posts/:id", getSpecificPost)
router.post("/posts", createPosts)
router.put("/posts/:id", updatePost)
router.delete("/posts/:id", deletePost)

export default router;