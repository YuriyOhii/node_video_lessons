import express from "express";
import * as movies from "../movies.js";
const moviesRouter = express.Router();

moviesRouter.get("/", async (req, res) => {
  try {
    const result = await movies.list();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

moviesRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await movies.get(id);
    if (!result) {
      const error = new Error();
      error.status = 400;
      error.message = "Bad request";
      throw error;
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message: message });
  }
});

moviesRouter.post("/", (req, res) => {
  // res.json(movies[0]);
  console.log("post movie");
});

moviesRouter.put("/:id", (req, res) => {
  // res.json(movies[0]);
  console.log("put movie");
});

moviesRouter.delete("/:id", (req, res) => {
  // res.json(movies[0]);
  console.log("delete movie");
});

export default moviesRouter;
