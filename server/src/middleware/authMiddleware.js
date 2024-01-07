import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
};

export default authMiddleware;