import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';
import dotenv from 'dotenv';
import { client } from '../server.js';
dotenv.config();

const userController = {

    registerUser: async (req, res) => {
        try {
            const usersCollection = client.db("learnByDoingMongo").collection("users");
            const{userName, email, password} = req.body;
            const existingUser = await usersCollection.findOne({email});
            if(existingUser) {
                return res.status(400).json({message: "User already exists"});
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({userName, email, password: hashedPassword});
            await usersCollection.insertOne(newUser);
            res.status(201).json({message: "User created"});
        } catch (error) {
            console.error(error.message);
            res.status(500).json({message: "Server error"});
        }
    },

    loginUser: async(req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid email" });
            }
            const accessToken = jwt.sign({ id: user._id, expiresIn: "1h" }, process.env.JWT_SECRET);
            res.status(200).json({ message: "Log in success", token: accessToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Server error" });
        }
    },

};
export default userController;