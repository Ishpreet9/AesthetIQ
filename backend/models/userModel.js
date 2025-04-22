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
  creditBalance: { type: Number, default: 5 },
  createdAt:{
    type: Date,
    default: Date.now
  },
  images: [
    {
      url: { type: String },
      prompt: { type: String },
      style: { type: String },
      ratio: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  bookmarkedImageUrls: [String]
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;