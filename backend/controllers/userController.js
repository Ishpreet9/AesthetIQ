import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing details" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const user = new userModel(userData);
        await user.save();

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //find email and include password explicitly 
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        //comparing passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' })
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

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ success: true, message: 'Login Successful', username: user.name });

    } catch (error) {
        res.status(400).json({ success: false, message: 'Server error', error: error.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Logout failed server error' });
    }
}

const userCredits = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ success: false, message: 'Unable to retrieve user information' })
        }
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.json({ success: true, credits: user.creditBalance, user: user.name, email: user.email })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const resetCredits = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ success: false, message: 'Unable to retrieve user information' });
        }
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.creditBalance = 5;
        await user.save();
        return res.status(200).json({ success: true, message: 'User credits reset to default' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const changeUsername = async (req, res) => {
    try {
        const userId = req.userId;
        const { newUsername } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.name = newUsername;
        await user.save();
        return res.status(200).json({ success: true, message: 'Username changed successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const changePassword = async (req, res) => {
    try {
        const userId = req.userId;
        const { oldPassword, newPassword } = req.body;
        const user = await userModel.findById(userId).select('+password');
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Both passwords are required' });
        }
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        // verifying old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }
        // hashing new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        // change password
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        return res.status(500).json({success:false,message:'Unable to change password',error:error.message});
    }
}

const deleteAccount = async(req,res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);
        if(!user)
        {
            return res.status(404).json({success:false,message:'User not found'});
        }
        await userModel.findByIdAndDelete(userId);
        // logout
        res.clearCookie('token',{
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
        return res.status(200).json({success:true,message:'Account deleted successfully'});
    } catch (error) {
        return res.status(500).json({success:false,message:'Unable to delete account',error:error.message});
    }
}

export { registerUser, loginUser, logoutUser, userCredits, resetCredits, changeUsername, changePassword, deleteAccount };