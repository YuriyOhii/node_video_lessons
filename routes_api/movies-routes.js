import express from "express";
const moviesRouter = express.Router();
import moviesControllers from "../controllers/movies-controllers.js";
import { isBodyEmpty } from "../middlewars/index.js";
import { moviesAddSchema, moviesPutSchema } from "../schemas/index.js";
import { schemaValidation } from "../decorators/index.js";

moviesRouter.get("/", moviesControllers.getAll);
moviesRouter.get("/:id", moviesControllers.getById);
moviesRouter.post(
  "/",
  isBodyEmpty,
  schemaValidation(moviesAddSchema),
  moviesControllers.post
);
moviesRouter.put(
  "/:id",
  isBodyEmpty,
  schemaValidation(moviesPutSchema),
  moviesControllers.putById
);
moviesRouter.delete("/:id", moviesControllers.deleteById);
export default moviesRouter;
