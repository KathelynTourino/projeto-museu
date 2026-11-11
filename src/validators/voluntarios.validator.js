const { body } = require('express-validator')

const validarVoluntario = [
    body('nome')
        .exists({ checkFalsy: true })
        .withMessage('O nome é obrigatório')
        .bail()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('O nome deve ter entre 3 e 100 caracteres'),

    body('email')
        .exists({ checkFalsy: true })
        .withMessage('O e-mail é obrigatório')
        .bail()
        .trim()
        .isEmail()
        .withMessage('O e-mail deve ser válido'),

    body('telefone')
        .exists({ checkFalsy: true })
        .withMessage('O telefone é obrigatório')
        .bail()
        .trim()
        .isLength({ min: 10, max: 15 })
        .withMessage('O telefone deve ter entre 10 e 15 caracteres'),

    body('area')
        .exists({ checkFalsy: true })
        .withMessage('A área é obrigatória')
        .bail()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('A área deve ter entre 3 e 100 caracteres'),

    body('disponibilidade')
        .exists({ checkFalsy: true })
        .withMessage('A disponibilidade é obrigatória')
        .bail()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('A disponibilidade deve ter entre 3 e 100 caracteres'),

    body('ativo')
        .optional()
        .isBoolean()
        .withMessage('O campo ativo deve ser verdadeiro ou falso')
]

module.exports = { validarVoluntario }