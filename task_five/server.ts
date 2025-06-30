import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import AuthController from './controllers/authController'
import TaskController from './controllers/taskController'
import UserService from './services/user.service'
import TaskService from './services/task.service'
import authMiddleware from './middleware/authMiddleware'

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())

// Database conn logic 
const prisma = new PrismaClient()

// Auth Routes
const authRouter = express.Router()
const authService = new UserService(prisma)
const authController = new AuthController(authService)
authRouter.post('/signup', authController.signupUser)
authRouter.post('/login', authController.loginUser)

// Task Routes
const taskRouter = express.Router()
const taskService = new TaskService(prisma)
const taskController = new TaskController(taskService)
taskRouter.post('/', authMiddleware, taskController.createTask)
taskRouter.get('/', authMiddleware, taskController.getAllTasks)
taskRouter.get('/:id', authMiddleware, taskController.getTaskById)
taskRouter.put('/:id', authMiddleware, taskController.updateTask)
taskRouter.delete('/:id', authMiddleware, taskController.deleteTask)

app.use('/auth', authRouter)
app.use('/tasks', taskRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})