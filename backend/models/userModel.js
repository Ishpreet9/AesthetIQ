import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true},
  password:
  {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  credit: { type: Number, default: 5 },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;