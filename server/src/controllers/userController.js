import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/userModel.js';
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
            const accessToken = jwt.sign({ id: user._id, expiresIn: "1h" }, process.env.JWT_SECRET);
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
                return res.status(403).json({ message: "Unauthorized" });
              }
            user.gameState = gameState;
            await user.save();
            res.status(200).json({ message: "GameState saved"})

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error"})
        }
    }

};
export default userController;