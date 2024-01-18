import express from 'express';
import userController from '../controllers/userController.js';
import serverController from '../controllers/serverController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/totalUsers", serverController.totalUsers);
userRouter.put("/saveGameState",authMiddleware.verifyToken, userController.saveGameState)
userRouter.put("/saveHighScore", authMiddleware.verifyToken, userController.saveScore);

export default userRouter;