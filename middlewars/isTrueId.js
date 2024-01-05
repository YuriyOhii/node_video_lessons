import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const isTrueId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(400, `id ${id} does not exist`));
  }
  next();
};

export default isTrueId;
