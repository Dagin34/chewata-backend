import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minilength: 6,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "This is my bio",
  },
}, {
  timestamps: true, //.. Created at and Updated at
});

const User = mongoose.model("User", userSchema);
export default User;

