const Joi = require('joi').extend(require('@joi/date'));

const TalkerSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .required()
    .messages({
        'string.min': 'O "name" deve ter pelo menos 3 caracteres',
        'any.required': 'O campo "name" é obrigatório',
    }),
    age: Joi.number()
    .min(18)
    .required()
    .messages({
        'number.min': 'A pessoa palestrante deve ser maior de idade',
        'any.required': 'O campo "age" é obrigatório',
    }),
    talk: Joi.object({
        watchedAt: Joi.date()            
            .format('DD/MM/YYYY')                  
            .required()
            .messages({
                'date.format': 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
                'any.required': 'O campo "watchedAt" é obrigatório',
            }),
        rate: Joi.number()
            .min(1)
            .max(5)
            .required()
            .messages({
                'number.min': 'O campo "rate" deve ser um inteiro de 1 à 5',
                'number.max': 'O campo "rate" deve ser um inteiro de 1 à 5',
                'any.required': 'O campo "rate" é obrigatório',
            }),
    })
    .required()
    .messages({
        'any.required': 'O campo "talk" é obrigatório',
    }),
});

module.exports = TalkerSchema;