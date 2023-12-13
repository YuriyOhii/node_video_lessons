import express from "express";
import cors from "cors";
import moviesRouter from "./movies/api/movies-router.js";

const app = express();

app.use(cors());
app.use("/api/movies", moviesRouter);

app.use((req, res) => {
  res.json({
    message: "Not found",
  });
});

app.listen(3000, () => {
  console.log("Server is running");
});
