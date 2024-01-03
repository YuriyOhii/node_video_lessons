// uEXvUieoQhFXVwDa mongoDB password;

// new user password TfhA1URORHQpiQbW;
import mongoose from "mongoose";
import app from "./app.js";
// double 2

const { DB_HOST, PORT } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log(`Server is running on PORT ${PORT}`);
    })
  )
  .catch((er) => {
    console.log(er);
    process.exit(1);
  });
