import * as moviesServices from "../movies/movies-services.js";
import {HttpError} from '../helpers/index.js';

export const getAll = async (req, res) => {
  try {
    const result = await moviesServices.list();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getById = async (req, res,next) => {
  try {
    const { id } = req.params;
    const result = await moviesServices.get(id);
    if (!result) {
     throw HttpError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const post = async (req, res) => {
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
