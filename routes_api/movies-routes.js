import express from "express";
const moviesRouter = express.Router();
import * as moviesControllers from "../controllers/movies-controllers.js";
import { isBodyEmpty } from "../middlewars/index.js";

moviesRouter.get("/", moviesControllers.getAll);
moviesRouter.get("/:id", moviesControllers.getById);
moviesRouter.post("/", isBodyEmpty, moviesControllers.post);
moviesRouter.put("/:id", isBodyEmpty, moviesControllers.putById);
moviesRouter.delete("/:id", moviesControllers.deleteById);
export default moviesRouter;
