import * as moviesServices from "../movies/movies-services.js";
import { HttpError } from "../helpers/index.js";
import { moviesAddSchema, moviesPutSchema } from "../schemas/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res, next) => {
  const result = await moviesServices.list();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await moviesServices.get(id);
  if (!result) {
    throw HttpError(404, `Movie with id ${id} is not found`);
  }
  res.json(result);
};

const post = async (req, res, next) => {
  const { error } = moviesAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await moviesServices.add(req.body);
  res.status(201).json(result);
};

const putById = async (req, res, next) => {
  const { error } = moviesPutSchema.validate(req.body);
  if (error) throw HttpError(400, error.message);
  const { id } = req.params;
  const result = await moviesServices.put(id, req.body);
  if (!result) throw HttpError(404, `Movie with id ${id} is not found`);
  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await moviesServices.remove(id);
  if (!result) throw HttpError(404, `Movie with id ${id} is not found`);
  res.json({ message: "Movie deleted succesfully" });
};

export default {
  deleteById: ctrlWrapper(deleteById),
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  post: ctrlWrapper(post),
  putById: ctrlWrapper(putById),
};
