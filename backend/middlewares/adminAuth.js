import jwt, { decode } from 'jsonwebtoken';
import User from '../models/UserModel.js';

export const adminAuth = async(req, res, next) => {
    try {
        const {token} = req.headers;

        if(!token) {
            return res.json({success: false, message: "Please login!"})
        }

        const decoded = jwt.decode(token, process.env.JWT_SECRET_KEY);

        if(!decoded) {
            return res.json({success: false, message: "Login Again!"})
        }
        const user = await User.findById(decoded.id);

        if(!user) {
            return res.json({success: false, message: "User not found!"})
        }
        req.user = user;

        if(user.role === "admin") {
            next();
        } else {
            return res.json({success: false, message: "Unauthorized Access!"})
        }
    } catch (error) {
       res.json({success: false, message: error.message});
    }
}