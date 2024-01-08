import User from "../model/userModel.js";
import authMiddleware from "../middleware/authMiddleware.js";
const serverController = {

    totalUsers: [authMiddleware.isAdmin, async (req, res) => {
        const count = await User.countDocuments();
        res.send(count.toString());
    }],
    
};
export default serverController;