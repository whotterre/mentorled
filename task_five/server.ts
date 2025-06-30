import express from 'express'
import cors from 'cors'
import { PrismaClient } from './prisma/generated/prisma'
import AuthController from './controllers/authController'
import UserService from './services/user.service'

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())

// Database conn logic 
const prisma = new PrismaClient()

// Routes
const authRouter = express.Router()
const authService = new UserService(prisma)
const authController = new AuthController(authService)
authRouter.post('/signup', authController.signupUser)
authRouter.post('/login', authController.loginUser)

// 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})