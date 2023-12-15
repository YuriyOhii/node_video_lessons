import express from 'express';
const moviesRouter = express.Router();
import * as moviesControllers from '../controllers/movies-controllers.js'

moviesRouter.get('/', moviesControllers.getAll);
moviesRouter.get('/:id', moviesControllers.getById)
export default moviesRouter;