import Joi from 'joi';

export const SignInRequestDto = Joi.object({
  username: Joi.string()
    .required()
    .messages({ "any.required": `"username" is a required field` }),
  password: Joi.string().min(6).required().messages({
    "any.required": `password is required`,
    "string.length": "password length must be at least 6 characters long",
  }),
});
