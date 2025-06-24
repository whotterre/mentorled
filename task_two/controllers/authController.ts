import { Request, Response } from "express"
import validator from "validator"
import User from "../models/user"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

dotenv.config()
/*
    A controller function to sign up a user 
*/
const signupUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        if (validator.isEmpty(name)) {
            return res.status(400).json({ "error": "Name field is required to sign up" })
        }

        if (validator.isEmpty(email)) {
            return res.status(400).json({ "error": "Email field is required to sign up" })
        }
        if (validator.isEmpty(password)) {
            return res.status(400).json({ "error": "Password field is required to sign up" })
        }

        // Check if user already exists
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ "error": "User already exists with that email. Try signing up." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            email,
            name,
            password: hashedPassword
        })

        await newUser.save()

        return res.status(200).json({
            "message": "User account created successfully!",
            "user": newUser
        })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ "error": "Something went really wrong on our end when you tried to sign up" })
    }
}

/*
    Controller function to login a user

*/
const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (validator.isEmpty(email)) {
            return res.status(400).json({ "error": "Email field is required to login" })
        }

        if (validator.isEmpty(password)) {
            return res.status(400).json({ "error": "Password field is required to login" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ "error": "User does not exist with that email. Try signing up." })
        }
        const isValidPassword = bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({ "error": "Incorrect password. Please try again." })
        }
        // Sign JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: parseInt(process.env.JWT_EXPIRY || "15", 10) }
        )

        return res.status(200).json({
            "message": "User logged in successfully!",
            "user": user,
            "accessToken": token
        })
    } catch (e: any) {
        console.error(e)
        return res.status(500).json({ "error": "Something went really wrong on our end when you tried to sign in" })
    }
}

// Gets user profile
interface CustomRequest extends Request {
    user?: {
        userId: string
    }
}

/*
    Gets a user profile
*/
const getProfile = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user!.userId;

        // Fetch user profile
        const userProfile = await User.findOne({ _id: userId })
        if (!userProfile) {
            return res.status(404).json({ "error": "User profile doesn't exist with that ID" })
        }
        return res.status(200).json({ "message": "User profile fetched successfully", "userId": userId });
    } catch (e: any) {
        return res.status(500).json({ "error": "Something went wrong while try to fetch your profile on our end" })
    }

}

export { signupUser, loginUser, getProfile }