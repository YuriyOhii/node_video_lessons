import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import { Movie, moviesAddSchema, moviesPutSchema } from "../models/Movie.js";

const getAll = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const owner = req.user;
  const result = await Movie.find({ owner }, "-createAt", {
    skip,
    limit,
  }).populate("owner");
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id: _id } = req.params;
  const { id: owner } = req.user;
  const result = await Movie.findOne({ _id, owner });
  if (!result) {
    throw HttpError(404, `Movie with id ${id} is not found`);
  }
  res.json(result);
};

const post = async (req, res, next) => {
  const owner = req.user.id;
  const result = await Movie.create({ ...req.body, owner });
  res.status(201).json(result);
};

const putById = async (req, res, next) => {
  const { id: _id } = req.params;
  const { id: owner } = req.user;
  const result = await Movie.findByIdAndUpdate({ _id, owner }, req.body);
  if (!result) throw HttpError(404, `Movie with id ${id} is not found`);
  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { id: _id } = req.params;
  const { id: owner } = req.user;
  const result = await Movie.findByIdAndDelete({ _id, owner });
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
