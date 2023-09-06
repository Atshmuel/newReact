import Joi from "joi";

export const createPersonSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().positive().required(),
  groups: Joi.array().items(Joi.string()).required(),
});

// TODO: create custom validator for ObjectId
export const getDelUpPersonSchema = Joi.object({
  id: Joi.string().required(),
});

export const getByNameSchema = Joi.object({
  name: Joi.string().required(),
});
