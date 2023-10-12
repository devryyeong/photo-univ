import { NextFunction } from "express";
import bcrypt from "bcryptjs";

const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 4,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String
});

userSchema.pre("save", async function (next: NextFunction) {
  const user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;
