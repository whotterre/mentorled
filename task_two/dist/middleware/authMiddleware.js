"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    // Check for the existence of auth header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({
            "error": "Access denied due to lack of authorization header in request!"
        });
    }
    if (!authHeader.startsWith("Bearer")) {
        return res.status(401).json({ "error": "Invalid auth type" });
    }
    const splitToken = authHeader.split(" ");
    if (splitToken.length < 2) {
        return res.status(401).json({
            "error": "Invalid auth header"
        });
    }
    // Check that the JWT is valid
    const isValid = jsonwebtoken_1.default.verify(splitToken[1], process.env.JWT_SECRET);
    if (!isValid) {
        return res.status(401).json({
            "error": "Invalid or malformed auth token",
        });
    }
    // If all goes as planned, enter ye into Valhalla!
    next();
};
exports.default = authMiddleware;
