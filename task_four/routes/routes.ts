import express from "express";
import * as boardControllers from "../controllers/boardController"
import * as taskControllers from "../controllers/tasksController"
import { loginUser, signupUser } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

// Authentication routes 
router.post("/login", loginUser)
router.post("/signup", signupUser)

// Boards
router.post("/boards", authMiddleware, boardControllers.createBoard)
router.get("/boards", authMiddleware, boardControllers.getAllBoards)
router.get("/board/:id", authMiddleware, boardControllers.getSpecificBoard)
router.put("/board/:id", authMiddleware, boardControllers.updateBoard)
router.delete("/board/:id", authMiddleware, boardControllers.deleteBoard)

//Tasks
router.post("/tasks", authMiddleware, taskControllers.createTask)
router.get("/tasks", authMiddleware, taskControllers.getAllTasks)
router.get("/task/:id", authMiddleware, taskControllers.getSpecificTask)
router.put("/task/:id", taskControllers.updateTask)
router.delete("/task/:id", authMiddleware, taskControllers.deleteTask)

export default router;