import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = async (req,res) => {
     try {
        const {name, email, password} = req.body;
        if(!name || !email || !password)
        {
            return res.json({success:false,message:"Missing details"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const userData = { 
            name, 
            email,
            password: hashedPassword
        }
        
        const user = new userModel(userData);
        await user.save();

        res.status(201).json({success:true, message:'User registered successfully'});
    } catch (error) {
        res.status(500).json({success:false, message:'Server error',error:error.message})
    }
}

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
    
        //find email and include password explicitly 
        const user = await userModel.findOne({email}).select('+password');
        if(!user)
        {
            return res.status(400).json({message:'Invalid email or password'});
        }
    
        //comparing passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        {
            return res.status(400).json({message:'Invalid email or password'})
        }
        
        //if matched then generate token 
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        )

        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV==="production",
            sameSite: "Strict"
        });
    
        res.status(200).json({message:'Login Successful', username: user.name});
        
    } catch (error) {
        res.status(400).json({message:'Server error',error:error.message});
    }
}

const userCredits = async (req,res) => {
    try {
        console.log(req.user);
        console.log(req.body);
        const userId = req.userId;
        if(!userId)
        {
            return res.status(400).json({success:false,message:'Unable to retrieve user information'})
        }
        const user = await userModel.findById(userId);
        if(!user)
        {
            return res.status(404).json({success:false,message:'User not found'});
        }
        return res.json({success:true,credits: user.creditBalance, user:{name: user.name}})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
}

export {registerUser,loginUser,userCredits};