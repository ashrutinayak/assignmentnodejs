import { Joi } from 'celebrate'

const REGEX = Object.freeze({
  EMAIL: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/
})

const string = Object.freeze({
  required: Joi.string().max(250).required(),
  optional: Joi.string().max(250).optional()
})

const stringArray = Object.freeze({
  required: Joi.array().items(Joi.string()).min(1).required(),
  optional: Joi.array().items(Joi.string()).min(1).optional()
})

const text = Object.freeze({
  required: Joi.string().max(29999).required(),
  optional: Joi.string().max(29999).optional()
})

const uri = Object.freeze({
  require: Joi.string().uri().max(255).required(),
  optional: Joi.string().uri().max(2048).optional()
})

const email = Object.freeze({
  required: Joi.string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2 })
    .regex(REGEX.EMAIL)
    .required(),
  optional: Joi.string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2 })
    .regex(REGEX.EMAIL)
    .optional()
})

export const fieldsValidator = {
  string,
  stringArray,
  text,
  uri,
  email
}
