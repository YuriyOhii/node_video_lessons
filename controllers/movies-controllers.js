import * as moviesServices from "../movies/movies-services.js";
import { HttpError } from "../helpers/index.js";

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
  // res.json(movies[0]);
  console.log("post movie");
};

export const putById = async (req, res) => {
  // res.json(movies[0]);
  console.log("put movie");
};

export const deleteById = async (req, res) => {
  // res.json(movies[0]);
  console.log("delete movie");
};
