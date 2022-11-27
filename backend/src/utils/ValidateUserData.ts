import * as Joi from "joi";

const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

export const userValidation = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).pattern(new RegExp(pattern)).required()
});