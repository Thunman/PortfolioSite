import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/userModel.js';
dotenv.config();

const getToken = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.includes(" ")) {
        throw new Error("Invalid header");
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
}

const authMiddleware = {

    verifyToken: (req, res, next) => {
        try {
            req.userData = getToken(req);
            next();
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    },
    isAdmin: async (req, res, next) => {
        try {
            const decoded = getToken(req);
            const user = await User.findById(decoded.id);
            if (user && user.isAdmin) {
                req.user = user;
                next();
            } else {
                throw new Error("User not Admin");
            }
        } catch (error) {
            next(error);
        }
    },
};

export default authMiddleware;