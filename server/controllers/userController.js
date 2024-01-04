import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const userController = {

    registerUser: async (req, res) => {
        try {
            const{userName, email, password} = req.body;
            const existingUser = await User.findOne({email});
            if(existingUser) {
                return res.status(400).json({message: "User already exists"});
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({userName, email, password: hashedPassword});
            await newUser.save();
            res.status(201).json({message: "User created"});
        } catch (error) {
            console.error(error.message);
            res.status(500).json({message: "Server error"});
        }
    },

    loginUser: async(res, req) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if(!user) {
                return res.status(400).json({message: "Invalid email"});
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch) {
                return res.status(400).json({message: "Invalid password"});
            }
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            res.status(200).json({token});
        } catch (error) {
            console.error(error.message);
            res.status(500).json({message: "Server error"});
        }
    },

};
export default userController;