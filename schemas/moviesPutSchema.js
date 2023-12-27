import Joi from "joi";

const moviesPutSchema = Joi.object({
  director: Joi.string(),
  title: Joi.string(),
});

export default moviesPutSchema;
