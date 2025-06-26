import { Request, Response } from "express"
import validator from "validator"
import User from "../models/author"
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
            res.status(400).json({ "error": "Name field is required to sign up" })
        }

        if (validator.isEmpty(email)) {
            res.status(400).json({ "error": "Email field is required to sign up" })
        }
        if (validator.isEmpty(password)) {
            res.status(400).json({ "error": "Password field is required to sign up" })
        }

        // Check if user already exists
        const userExists = await User.findOne({ email })
        if (userExists) {
            res.status(400).json({ "error": "User already exists with that email. Try signing up." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            email,
            name,
            password: hashedPassword
        })

        await newUser.save()

        res.status(201).json({
            "message": "User account created successfully!",
            "user": newUser
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({ "error": "Something went really wrong on our end when you tried to sign up" })
    }
}

/*
    Controller function to login a user

*/
const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (validator.isEmpty(email)) {
            res.status(400).json({ "error": "Email field is required to login" })
        }

        if (validator.isEmpty(password)) {
            res.status(400).json({ "error": "Password field is required to login" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ "error": "User does not exist with that email. Try signing up." })
        }
        const isValidPassword = await bcrypt.compare(password, user!.password)
        if (!isValidPassword) {
            res.status(400).json({ "error": "Incorrect password. Please try again." })
        }
        // Sign JWT token
        const token = jwt.sign(
            { userId: user!._id },
            process.env.JWT_SECRET as string,
            { expiresIn: parseInt(process.env.JWT_EXPIRY || "15", 10) }
        )

        res.status(200).json({
            "message": "User logged in successfully!",
            "user": user,
            "accessToken": token
        })
    } catch (e: any) {
        console.error(e)
        res.status(500).json({ "error": "Something went really wrong on our end when you tried to sign in" })
    }
}

const listAllAuthors = async (req: Request, res: Response) => {
    const authors = await User.find({})
    if(!authors){
        res.status(404).json({"message": "No authors found"})
    }
    res.status(200).json(authors)
}

export { signupUser, loginUser, listAllAuthors }