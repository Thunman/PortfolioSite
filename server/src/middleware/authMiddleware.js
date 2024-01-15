import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/userModel.js';
dotenv.config();

const authMiddleware = {

    verifyToken: (req, res, next) => {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.includes(" ")) {
            return res.status(401).json({ message: "Invalid header" });
        }
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userData = decoded;
            next();
        } catch (error) {
            console.error(error.message);
            res.status(401).json({ message: "Invalid token" });
        }
    },
    isAdmin: async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.includes(" ")) {
            return res.status(401).send("Invalid header");
        }
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (user && user.isAdmin) {
                req.user = user;
                next();
            } else {
                res.status(403).send("User not Admin");
            }
            
        } catch (error) {
            res.status(401).send("Unauthorized");
        }
    },
};

export default authMiddleware;