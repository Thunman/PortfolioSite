import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/userModel.js";

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
			const newUser = new User({
				userName,
				email,
				password: hashedPassword,
			});
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
			const isCorrectPassword = await bcrypt.compare(
				password,
				user.password
			);
			if (!isCorrectPassword) {
				return res.status(400).json({ message: "Invalid Password" });
			}
			const accessToken = jwt.sign(
				{ id: user._id, email: user.email },
				process.env.JWT_SECRET,
				{ expiresIn: "1h" }
			);
			res.status(200).json({
				message: "Log in success",
				token: accessToken,
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).json({ message: "Server error" });
		}
	},
	saveInfo: async (req, res) => {
		try {
			const { email } = req.user;
			const accessToken = req.header("Authorization");
			if(!jwt.verify(accessToken, process.env.JWT_SECRET)){
				return res.status(401).json({ message: "Invalid token" });
			}
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ message: "Invalid email" });
			}
			const { name, age, location, aboutText, aboutHeader, showEmail, userName } =
				req.body;
			user.basicInfo = { name, age, location, userName};
			user.about = { aboutText, aboutHeader };
			user.showEmail = showEmail;
			await user.save();
			res.status(200).json({ message: "User info saved" });
		} catch (error) {
			console.error(error.message);
			res.status(500).json({ message: "Server error" });
		}
	},
	saveProfilePic: async (req, res) => {
		try {
			const { email } = req.user;
			const accessToken = req.header("Authorization");
			if(!jwt.verify(accessToken, process.env.JWT_SECRET)){
				return res.status(401).json({ message: "Invalid token" });
			}
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ message: "Invalid email" });
			}
			const profilePic = req.file.path;
			user.profilePic = profilePic;
			await user.save();
			res.status(200).json({ message: "Profile pic saved" });
		} catch (error) {
			console.error(error.message);
			res.status(500).json({ message: "Server error" });
		}
	},
};
export default userController;
