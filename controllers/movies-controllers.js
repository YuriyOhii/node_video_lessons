import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import { Movie, moviesAddSchema, moviesPutSchema } from "../models/Movie.js";

const getAll = async (req, res, next) => {
  const result = await Movie.find({});
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Movie.findById(id);
  if (!result) {
    throw HttpError(404, `Movie with id ${id} is not found`);
  }
  res.json(result);
};

const post = async (req, res, next) => {
  const result = await Movie.create(req.body);
  res.status(201).json(result);
};

const putById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Movie.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!result) throw HttpError(404, `Movie with id ${id} is not found`);
  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Movie.findByIdAndDelete(id);
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
