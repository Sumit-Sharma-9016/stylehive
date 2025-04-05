import User from "../models/UserModel.js";
import validator from 'validator';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

function createToken(id) {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY)
}

// route for user or admin registration
const userRegister = async (req, res) => {
    try {
        const {name, email, password, secretKey} = req.body;

        if(!name || !email || !password) {
            return res.json({message: "fill all the required details!"})
        }
        
        let exists = await User.findOne({email});

        // some checks
        if(exists) {
            return res.json({message: "User already exists"});
        }
        if(!validator.isEmail(email)) {
            return res.json({message: "invalid email!"})
        }

        // hashing pass
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPass,
            role: secretKey === process.env.ADMIN_SECRET_KEY? 'admin': 'user',
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        return res.json({success: true, token})

    } catch (error) {
        return res.json({message: error.message})
    }
}

// route for login
const userLogin = async (req, res) => {

    try {
        const {email, password} = req.body;
    
        if(!email || !password) {
            return res.json({message: "fill all the required details!"})
        }
    
        if(!validator.isEmail(email)) {
            return res.json({message: "invalid email"});
        }
    
        const user = await User.findOne({email})
        
        if(!user) {
            return res.json({message: "user doesn't exists!"})
        }
    
        if(!bcrypt.compareSync(password, user.password)) {
            return res.json({message: "wrong password!"});
        }
    
        const token = createToken(user._id);
        
        return res.json({success: true, token});

    } catch (error) {
        return res.json({message: error.message})
    }
    
}

const userUpdate = async(req, res) => {
    try {
        const {name, cart, orders, address} = req.body
        const result = await User.findByIdAndUpdate(req.params.id, {name, cart, orders, address});
        res.json({success: true, message: 'Updated successfully!'})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

const getUsers = async(req, res) => {
    try {
        const result = await User.find({});
        res.json({success: true, data: result});
    } catch (error) {
        res.json({success:false, message: error.message});
    }
}

const userDetail = async(req, res) => {
    try {
        const {token} = req.headers;
        
        if(!token) {
            return res.json({success: false, message: 'Please login'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded) {
            return res.json({success: false, message: 'Something went wrong!'})
        }

        const user = await User.findById(decoded.id).select("-password");

        if(!user) {
            return res.json({success: false, message: 'User not found!'})
        }
        return res.json({success: true, user: user.toObject()});
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
    
}

const getUser = async(req, res) => {
    try {
        const result = User.findById(req.params.id).select("-password");
        return res.json({success: true, data: result});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

export {userLogin, userRegister, userDetail, userUpdate, getUsers, getUser}