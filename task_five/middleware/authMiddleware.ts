import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface CustomRequest extends Request {
    user?: {
        userID: number
    }
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        if (typeof decoded === 'object' && 'userID' in decoded) {
            req.user = decoded as { userID: number };
        } else {
            throw new Error('Invalid token payload');
        }
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(403).json({ message: 'Forbidden' });
    }
}