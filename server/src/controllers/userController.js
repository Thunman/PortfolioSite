import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User, { HighScore } from '../model/userModel.js';
dotenv.config();


const userController = {

    registerUser: async (req, res) => {
        try {

            const { userName, email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ userName, email, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ message: "User created" });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Server error" });
        }
    },

    loginUser: async (req, res) => {
        
        try {
            const { email, password } = req.body;
            
            const user = await User.findOne({ email });
            
            if (!user) {
                return res.status(400).json({ message: "Invalid email" });
            }
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (!isCorrectPassword) {
                return res.status(400).json({ message: "Invalid Password" });
            }
            const accessToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {expiresIn: "1h"});
            res.status(200).json({ message: "Log in success", token: accessToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Server error" });
        }
    },

    saveGameState: async (req, res) => {
        try {
            const { email, gameState, accessToken } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: "User does not exist"});
            }
            if (req.userData.email !== email) {
                console.log("email missmatch")
                return res.status(403).json({ message: "Unauthorized" });
              }
            user.gameState = gameState;
            await user.save();
            res.status(200).json({ message: "GameState saved"})

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error, error from saveGameState"})
        }
    },
    saveScore: async (req, res) => {
        try {
            const { email, score, accessToken } = req.body;
            jwt.verify(accessToken, process.env.JWT_SECRET);
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
              } else {
                const highScore = new HighScore({ email, score });
                await highScore.save();
              }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error, error from saveScore"})
        }
    }

};
export default userController;