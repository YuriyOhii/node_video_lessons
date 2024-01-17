import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleForStatus400 } from "./hooks.js";

const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: emailRegExp,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleForStatus400);

const signUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegExp),
  password: Joi.string().required().min(6),
});

const signInSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegExp),
  password: Joi.string().required().min(6),
});

const User = model("user", userSchema);

export { signInSchema, signUpSchema, User };
