import { Schema, model } from "mongoose";

const schema = Schema({
  title: String,
  director: String,
});

const Movie = model("movie", schema);
export default Movie;
