import express from "express";
const moviesRouter = express.Router();
import moviesControllers from "../controllers/movies-controllers.js";
import { isBodyEmpty, isTrueId, upload } from "../middlewars/index.js";
import {
  moviesAddSchema,
  moviesPutSchema,
  moviesPatchSchema,
} from "../models/Movie.js";
import { schemaValidation } from "../decorators/index.js";
moviesRouter.get("/", moviesControllers.getAll);
moviesRouter.get("/:id", isTrueId, moviesControllers.getById);
moviesRouter.post(
  "/",
  upload.single("poster"),
  isBodyEmpty,
  schemaValidation(moviesAddSchema),
  moviesControllers.post
);
moviesRouter.put(
  "/:id",
  upload.single("poster"),
  isBodyEmpty,
  isTrueId,
  schemaValidation(moviesPutSchema),
  moviesControllers.putById
);
moviesRouter.patch(
  "/:id/favourite",
  isBodyEmpty,
  isTrueId,
  schemaValidation(moviesPatchSchema),
  moviesControllers.putById
);
moviesRouter.delete("/:id", isTrueId, moviesControllers.deleteById);
export default moviesRouter;
