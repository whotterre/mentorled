import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

/*
    Authentication middleware
*/

interface CustomRequest extends Request {
    user: {
        userId: string
    }
}

const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const customReq = req as CustomRequest;
    // Check for the existence of auth header
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
        res.status(401).json({
            "error": "Access denied due to lack of authorization header in request!"
        })
    }

    if (!authHeader!.startsWith("Bearer")) {
        res.status(401).json({ "error": "Invalid auth type" })
    }

    const splitToken = authHeader!.split(" ")
    if (splitToken.length < 2) {
        res.status(401).json({
            "error": "Invalid auth header"
        })
    }

    // Check that the JWT is valid
    const payload = jwt.verify(splitToken[1], process.env.JWT_SECRET!)
    if (!payload) {
        res.status(401).json({
            "error": "Invalid or malformed auth token",
        })
    }

    customReq.user = payload as { userId: string }

    // If all goes as planned, enter ye into Valhalla!
    next()
}

export default authMiddleware
