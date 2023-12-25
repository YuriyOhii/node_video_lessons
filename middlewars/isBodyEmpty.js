import { HttpError } from "../helpers/index.js";
const isBodyEmpty = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) return next(HttpError(400, "Request object is empty"));
  next();
};

export default isBodyEmpty;
