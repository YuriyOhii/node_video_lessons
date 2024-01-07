const handleForStatus400 = (err, data, next) => {
  const { name, code } = err;
  err.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};

const updateParameters = function (next) {
  (this.options.new = true), (this.options.runValidators = true);
  next();
};

export { handleForStatus400, updateParameters };
