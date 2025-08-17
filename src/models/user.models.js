// 1) Define the Schema
// 2) Define Model for the Schema

import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import crypto, { hash } from 'crypto';

// this will load env var from .env into process.env

export const UserSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://placehold.co/200x250`,
        localPath: "",
      },
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);


// For hashing the password -> use bcrypt library -> async task perform
// whenever we save data there can be operation performed -> (methods or functions) and (hooks)
// hooks can be classified as pre-hooks and post-hooks
// JWT (Json Web Token) -> Header, Payload and Signature -> xxxx.yyyy.zzzz


// hooks -> pre or post
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  await bcrypt.hash(this.password, 10);
  next();
});


// methods or functions
// this function will return either true or false
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};


UserSchema.methods.generatingAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};


UserSchema.methods.generatingRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};


UserSchema.methods.generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

    const tokenExpiry = Date.now() + (20*60*1000);

    return {unHashedToken, hashedToken, tokenExpiry};
}


export const User = mongoose.model("User", UserSchema);
