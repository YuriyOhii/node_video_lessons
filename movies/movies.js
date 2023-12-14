import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const moviesPath = path.resolve("db", "movies.json");
const updateMovies = async (data) =>
  fs.writeFile(moviesPath, JSON.stringify(data, null, 2));

export async function list() {
  const movies = await fs.readFile(moviesPath, "utf-8");
  return JSON.parse(movies);
}

export async function put(movieId, ...data) {
  const movies = await list();
  const idx = movies.findIndex(({ id }) => id === movieId);
  if (idx === -1) {
    return null;
  }
  const updatedMovie = { ...movies[idx], ...data };
  return updatedMovie;
}

export async function get(movieId) {
  const movies = await list();
  const movie = movies.find(({ id }) => movieId === id);
  return movie || null;
}

export async function remove(movieId) {
  const movies = await list();
  const idx = movies.findIndex(({ id }) => id === movieId);
  if (idx === -1) {
    return null;
  }
  const [deletedMovie] = movies.splice(idx, 1);
  updateMovies(movies);
  return deletedMovie;
}

export async function add(data) {
  const movies = await list();
  const newMovie = { id: nanoid(), ...data };
  movies.push(newMovie);
  updateMovies(movies);
  return newMovie;
}
