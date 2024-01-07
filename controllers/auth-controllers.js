import { User } from "../models/User.js";
import { ctrlWrapper } from "../decorators/index.js";

const signUp = async (req, res) => {
  console.log("sign in");
};

const signIn = async (req, res) => {
  console.log("sign in");
};

export default {
  signIn: ctrlWrapper(signIn),
  signUp: ctrlWrapper(signUp),
};
