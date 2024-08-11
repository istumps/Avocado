import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

//login user

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //check if user exists
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message: "User does not exist"});
        } 
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, message: "Invalid credentials"});
        }
        const token = createToken(user._id);
        res.json({success:true, token});

    }catch(error){
            console.log(error);
            res.json({success:false, message: `Failed to login ${error}`});
        }
    }
const createToken = (id) => {
    
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body; 
    try{
        //check if user exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false, message: "User already exists"});
        }
        //validate email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message: "Invalid email address"});
        }
        if(password.length < 8){
            return res.json({success:false, message: "Password must be at least 8 characters long"});
        }
        //hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true, token});

    }
    catch(error){
        console.log(`Failed to register user ${error}`);
        res.json({success:false, message: `Failed to register user ${error}`});
    }

}

export { loginUser, registerUser };