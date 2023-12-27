import * as moviesServices from "../movies/movies-services.js";
import { HttpError } from "../helpers/index.js";
import { moviesAddSchema, moviesPutSchema } from "../schemas/index.js";

export const getAll = async (req, res, next) => {
  try {
    const result = await moviesServices.list();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await moviesServices.get(id);
    if (!result) {
      throw HttpError(404, `Movie with id ${id} is not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const post = async (req, res, next) => {
  try {
    const { error } = moviesAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await moviesServices.add(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const putById = async (req, res, next) => {
  try {
    const { error } = moviesPutSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);
    const { id } = req.params;
    const result = await moviesServices.put(id, req.body);
    if (!result) throw HttpError(404, `Movie with id ${id} is not found`);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req, res) => {
  // res.json(movies[0]);
  console.log("delete movie");
};
