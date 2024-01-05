const handleForStatus400 = (err, data, next) => {
  err.status = 400;
  next();
};

const updateParameters = function (next) {
  (this.options.new = true), (this.options.runValidators = true);
  next();
};

export { handleForStatus400, updateParameters };
