import express from "express";

const moviesRouter = express.Router();

moviesRouter.get("/", (req, res) => {
  // res.json(movies);
  console.log('list movies')
});

moviesRouter.get("/:id", (req, res) => {
  // res.json(movies[0]);
  console.log('get movies');
});

moviesRouter.post("/", (req, res) => {
  // res.json(movies[0]);
  console.log('post movie')
});

moviesRouter.put("/:id", (req, res) => {
  // res.json(movies[0]);
  console.log('put movie')
});

moviesRouter.delete("/:id", (req, res) => {
  // res.json(movies[0]);
  console.log('delete movie')
});

export default moviesRouter;
