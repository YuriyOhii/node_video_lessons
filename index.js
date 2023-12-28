import express from "express";
import cors from "cors";
import moviesRouter from "./routes_api/movies-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
// console.log("hello");

// const sum = (a, b) => a + b;

// const isInteger =
//   (func) =>
//   (...args) => {
//     if (args.some((el) => !Number.isInteger(el)))
//       throw new Error("Not integer");
//     return func(...args);
//   };

//   const wrapper = isInteger(sum);
//   console.log(wrapper(2,1))
