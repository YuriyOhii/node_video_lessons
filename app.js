import express from "express";
import cors from "cors";
import moviesRouter from "./routes_api/movies-routes.js";
import authRouter from "./routes_api/auth-routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRouter);
app.use("api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

export default app;
