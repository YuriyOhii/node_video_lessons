import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleForStatus400, updateParameters } from "./hooks.js";

const genres = ["fantastic", "love story"];
const releaseRegExp = /^\d{4}$/;

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    genre: {
      type: String,
      enum: genres,
      required: true,
    },
    releaseYear: {
      type: String,
      match: releaseRegExp,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

schema.post("save", handleForStatus400);
schema.post("findOneAndUpdate", handleForStatus400);
schema.pre("findOneAndUpdate", updateParameters);

const moviesAddSchema = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
  favourite: Joi.boolean(),
  genre: Joi.string()
    .valid(...genres)
    .required(),
  releaseYear: Joi.string().pattern(releaseRegExp).required(),
});

const moviesPutSchema = Joi.object({
  director: Joi.string(),
  title: Joi.string(),
  favourite: Joi.boolean(),
  genre: Joi.string().valid(...genres),
  releaseYear: Joi.string().pattern(releaseRegExp),
});

const moviesPatchSchema = Joi.object({
  favourite: Joi.boolean().required(),
});

const Movie = model("movie", schema);

export { Movie, moviesAddSchema, moviesPutSchema, moviesPatchSchema };
