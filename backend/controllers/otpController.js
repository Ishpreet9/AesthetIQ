import nodemailer from 'nodemailer'
import crypto from 'crypto'
import otpModel from '../models/otpModel.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_NAME,
        pass: process.env.MAIL_PWD
    },
});

const sendOtpEmail = async (userEmail, otp) => {
    const mailOptions = {
        from: process.env.MAIL_NAME,
        to: userEmail,
        subject: 'OTP Code',
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333; font-size: 24px; margin-bottom: 16px;">Your OTP Code</h2>
        <div style="border: 2px solid #D1D5DB; background-color: #F3F4F6; padding: 20px; border-radius: 10px; text-align: center;">
        <p style="font-size: 18px; color: #333; margin-bottom: 12px;">Your OTP code is:</p>
        <div style="font-size: 24px; font-weight: bold; color: #333; padding: 10px; border: 2px solid #D1D5DB; display: inline-block; background-color: #F3F4F6;">
          ${otp}
        </div>
        </div>
        </div>` 
    }
    await transporter.sendMail(mailOptions);
};

const generateOtp = () => {
    const otp = crypto.randomInt(100000, 999999).toString();
    return otp;
}

const sendOtp = async (req, res) => {
    try {
        const { userEmail } = req.body;
        if (!userEmail) {
            res.status(400).json({ success: false, message: 'User email not provided' });
        }
        //generate otp 
        let otp = generateOtp();
        //store otp
        const otpData = new otpModel({
            email: userEmail,
            otp: otp,
        });
        await otpData.save();

        //send otp via email 
        await sendOtpEmail(userEmail, otp);
        res.status(200).json({ success: true, message: 'OTP sent successfully' });

    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP', error: error.message });
    }
}

const verifyOtp = async (req,res) => {
    try {
        const { userEmail, otp } = req.body;
        const otpData = await otpModel.findOne({email: userEmail});
        if(!otpData)
        {
            return res.status(400).json({success:false,message:'Otp not available or expired!'});
        }
        if(Date.now()>otpData.expiresAt)
        {
            return res.status(400).json({success:false,message:'Otp expired'});
        }
        if(otpData.otp === otp)
        {
            return res.status(200).json({success:true,message:'Otp verified successfully'});
        }
        else
        {
            return res.status(400).json({success:false,message:'Invalid otp'});
        }
    } catch (error) {
      console.log("Error verifying otp!");
      return res.status(500).json({success:false,message:'Error verifying otp',error:error.message});    
    }
}

export { sendOtp, verifyOtp }

