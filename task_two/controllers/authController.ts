import { Request, Response } from "express"
const validator = require("validator")
const User = require("../models/user")
/*
    A controller function to sign up a user 

*/
const signupUser = async (req: Request, res: Response) => {
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
    const newUser = new User({
        email,
        name,
        password
    })

    await newUser.save()

    return res.status(200).json({
        "message": "User account created successfully!",
        "user": newUser
    })
}

/*
    Controller function to login a user
    
*/
const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if(validator.isEmpty(email)) {
        return res.status(400).json({ "error": "Email field is required to login" })
    }

    if(validator.isEmpty(password)) {
        return res.status(400).json({ "error": "Password field is required to login" })
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ "error": "User does not exist with that email. Try signing up." })
    }
    if (user.password !== password) {
        return res.status(400).json({ "error": "Incorrect password. Please try again." })
    }

    return res.status(200).json({
        "message": "User logged in successfully!",
        "user": user
    })
}
export { signupUser, loginUser }