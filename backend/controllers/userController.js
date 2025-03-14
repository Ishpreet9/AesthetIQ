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

        res.status(201).json({message:'User registered successfully'});
    } catch (error) {
        res.status(500).json({message:'Server error',error:error.message})
    }
}