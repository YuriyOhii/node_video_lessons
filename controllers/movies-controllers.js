import * as moviesServices from "../movies/movies-services.js";
import Joi from "joi";
import { HttpError } from "../helpers/index.js";

const moviesAddSchema = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
});

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

export const putById = async (req, res) => {
  // res.json(movies[0]);
  console.log("put movie");
};

export const deleteById = async (req, res) => {
  // res.json(movies[0]);
  console.log("delete movie");
};
