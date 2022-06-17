const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string()
    .email()
    .required()
    .messages({
        'string.empty': 'O campo "email" é obrigatório',
        'string.email': 'O "email" deve ter o formato "email@email.com"',
        'any.required': 'O campo "email" é obrigatório',
    }),
    password: Joi.string()
    .min(6)
    .required()
    .messages({
        'string.min': 'O "password" deve ter pelo menos 6 caracteres',
        'any.required': 'O campo "password" é obrigatório',
        'string.empty': 'O campo "password" é obrigatório',
    }),
});

module.exports = loginSchema;