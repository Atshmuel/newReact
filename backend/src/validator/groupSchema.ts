import Joi from "joi";

export const groupSchema = Joi.object({
  groupName: Joi.string().required(),
});
export const getDelUpGroupSchema = Joi.object({
  id: Joi.string().required(),
});

export const updateGroupSchema = Joi.object({
  updateInfo: {
    groupName: Joi.string(),
    persons: Joi.array().items(Joi.string()),
    groups: Joi.array().items(Joi.string()),
    fathers: Joi.forbidden(),
    _id: Joi.forbidden(),
  },
});
export default groupSchema;
