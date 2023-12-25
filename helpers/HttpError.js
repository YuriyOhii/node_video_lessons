const errorCode = {
  400: "Bad request",
  401: "Authorization error",
  404: "Page not found",
  500: "Server error",
};

const HttpError = (status, message = errorCode[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;
