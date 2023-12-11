import express from "express";
import moment from "moment";
import fs from "fs/promises";
import movies from "./movies.js";

const app = express();

app.use((req, res, next) => {
  console.log("Hello I am first middleware");
  next();
});

app.use(async (req, res, next) => {
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");
  const { url, method } = req;
  const log = `\n ${method} ${url} ${date}`;
  await fs.appendFile("./logs.txt", log);
  next();
});

app.get("/products", (req, res) => {
  res.json([]);
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.listen(3000);
