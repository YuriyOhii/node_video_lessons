import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError, sendEmail } from "../helpers/index.js";
import "dotenv/config";

const { JWT_SECRET, BASE_ADDRESS } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Such email already exist!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = nanoid();
  const result = await User.create({
    ...req.body,
    password: hashedPassword,
    verificationCode,
  });

  const data = {
    to: email,
    subject: "Verification email.",
    html: `<a target="_blank" href="${BASE_ADDRESS}/api/auth/verify/${verificationCode}"> Click to verify your email</a>`,
  };
  sendEmail(data);
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
  await User.findOneAndUpdate({ email }, { token });
  res.json({ token: token });
};

const getCurrent = async (req, res) => {
  const { email, username } = req.user;
  res.json({ email, username });
};

const signOut = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });
  res.json({ message: "signOut success" });
};

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError(400, "No email to verify");
  }

  if (user.verificationCode === "" && user.verify === true) {
    throw HttpError(400, "Email is already verified");
  }

  await User.findOneAndUpdate(
    { verificationCode },
    { verificationCode: "", verify: true }
  );
  res.json({ message: "verification is success" });
};

export default {
  signIn: ctrlWrapper(signIn),
  signUp: ctrlWrapper(signUp),
  getCurrent: ctrlWrapper(getCurrent),
  signOut: ctrlWrapper(signOut),
  verifyEmail: ctrlWrapper(verifyEmail),
};
