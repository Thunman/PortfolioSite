import express from 'express';
import userController from '../controllers/userController.js';
import serverController from '../controllers/serverController.js';

const userRouter = express.Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/totalUsers", serverController.totalUsers);


export default userRouter;