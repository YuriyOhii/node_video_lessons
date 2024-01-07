import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ctrlWrapper } from "../decorators/index.js";
import HttpError from "../helpers/HttpError.js";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Such email already exist!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashedPassword });
  res.status(201).json({ username: result.username, email: result.email });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is incorrect!");
  }
  const passwordOK = await bcrypt.compare(password, user.password);
  if (!passwordOK) {
    throw HttpError(401, "Email or password is incorrect!");
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "23h" });
  res.json({ token: token });
};

export default {
  signIn: ctrlWrapper(signIn),
  signUp: ctrlWrapper(signUp),
};
