import multer from "multer";
import path from "path";

import { HttpError } from "../helpers/index.js";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const prefix = `${Date.now()}_${Math.random() * 1e9}`;
    const filename = prefix + "_" + file.originalname;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split(".").pop();
  if (extension === "exe") {
    cb(HttpError(400, "Extension exe is not valid"));
  }
  cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });

export default upload;
