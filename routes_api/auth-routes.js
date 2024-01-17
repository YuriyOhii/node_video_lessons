import express from "express";
import authControllers from "../controllers/auth-controllers.js";
import { isBodyEmpty } from "../middlewars/index.js";
import { schemaValidation } from "../decorators/index.js";
import { signInSchema, signUpSchema } from "../models/User.js";
import { authenticate } from "../middlewars/index.js";

const authRouter = express.Router();

authRouter.post(
  "/signUp",
  isBodyEmpty,
  schemaValidation(signUpSchema),
  authControllers.signUp
);

authRouter.post(
  "/signIn",
  isBodyEmpty,
  schemaValidation(signInSchema),
  authControllers.signIn
);

authRouter.get(
  "/current",
  isBodyEmpty,
  authenticate,
  authControllers.getCurrent
);

authRouter.post("/signOut", isBodyEmpty, authenticate, authControllers.signOut);

authRouter.get("/verify/:verificationCode", authControllers.verifyEmail);

export default authRouter;
