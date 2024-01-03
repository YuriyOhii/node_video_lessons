// uEXvUieoQhFXVwDa mongoDB password;

// new user password TfhA1URORHQpiQbW;
import mongoose from "mongoose";
import app from "./app.js";

const DB_HOST =
  "mongodb+srv://uaogiy:uEXvUieoQhFXVwDa@cluster0.cuxjisd.mongodb.net/sample_movies?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Server is running on PORT 3000");
    })
  )
  .catch((er) => {
    console.log(er);
    process.exit(1);
  });
