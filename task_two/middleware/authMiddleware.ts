import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Check for the existence of auth header
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
        return res.status(401).json({
            "error": "Access denied due to lack of authorization header in request!"
        })
    }

    if (!authHeader.startsWith("Bearer")) {
        return res.status(401).json({ "error": "Invalid auth type" })
    }

    const splitToken = authHeader.split(" ")
    if (splitToken.length < 2) {
        return res.status(401).json({
            "error": "Invalid auth header"
        })
    }

    // Check that the JWT is valid
    const isValid = jwt.verify(splitToken[1], process.env.JWT_SECRET!)
    if (!isValid) {
        return res.status(401).json({
            "error": "Invalid or malformed auth token",
        })
    }

    // If all goes as planned, enter ye into Valhalla!
    next()
}

export default authMiddleware
