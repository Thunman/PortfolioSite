import express from 'express';
import userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);

export default userRouter;