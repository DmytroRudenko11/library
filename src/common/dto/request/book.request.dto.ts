import Joi from 'joi';

export const AddBookRequestDto = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "any.required": `"title" is a required field ` }),
  author: Joi.string()
    .required()
    .messages({ "any.required": `"author" is a required field ` }),
  year: Joi.number()
    .max(4),
});

export const UpdateBookRequestDto = Joi.object({
  title: Joi.string()
    .messages({ "any.required": `"title" is a required field ` }),
  author: Joi.string()
    .messages({ "any.required": `"author" is a required field ` }),
  year: Joi.number().max(9999),

});

