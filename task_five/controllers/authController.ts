import { Request, Response } from "express";
import UserService from "../services/user.service";
import bcrypt from "bcryptjs";

class AuthController {
    authService: UserService;
    constructor(authService: UserService) {
        this.authService = authService
    }
    signupUser = async (req: Request, res: Response) => {
        try {
            // Validate request body
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                res.status(400).json({ message: "All fields are required" });
            }

            // Check if user already exists
            const existingUser = await this.authService.findUserByEmail(email);
            if (existingUser) {
                res.status(400).json({ message: "User already exists" });
            }
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10)

            // Create new user 
            const data = {
                name,
                email,
                password: hashedPassword,
            };

            const newUser = await this.authService.createUser(data);
            res.status(201).json({ message: "User created successfully", user: newUser });

        } catch (error: any) {
            console.error("Error during signup:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    loginUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ message: "Email and password are required" });
            }

            // Check if user exists
            const user = await this.authService.findUserByEmail(email);
            if (!user) {
                res.status(404).json({ message: "User not found" });
            }

            // Compare password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: "Invalid password" });
            }
            // Successful login
            res.status(200).json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });


        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default AuthController;