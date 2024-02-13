import express from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.post('/saveInfo', authMiddleware.verifyToken, userController.saveInfo);
userRouter.post('/profilePic', authMiddleware.verifyToken, upload.single('profilePic'), userController.uploadProfilePic);
export default userRouter;