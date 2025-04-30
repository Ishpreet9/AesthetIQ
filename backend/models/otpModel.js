import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {type:String, required:true},
    otp: {type:String, required:true},
    expiresAt: {type:Date, required:true, default: () => new Date(Date.now()+5*60*1000)},
});

otpSchema.index({ expiresAt:1 }, {expireAfterSeconds:0}) //ttl for database cleanup

const otpModel = mongoose.models.otp || mongoose.model("otp",otpSchema);

export default otpModel;