const { body } = require('express-validator')

const statusCandidatura = [
    'Pendente',
    'Aprovada',
    'Em análise'
]

const areasCandidatura = [
    'Recepção',
    'Acervo',
    'Eventos'
]

const validarCandidatura = [

    body('nome')
        .exists({ checkFalsy: true })
        .withMessage('O nome do candidato é obrigatório')
        .bail()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('O nome deve ter entre 3 e 100 caracteres'),

    body('email')
        .exists({ checkFalsy: true })
        .withMessage('O email do candidato é obrigatório')
        .bail()
        .trim()
        .isEmail()
        .withMessage('O email deve ser válido'),

    body('telefone')
        .exists({ checkFalsy: true })
        .withMessage('O telefone do candidato é obrigatório')
        .bail()
        .trim()
        .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/)
        .withMessage('O telefone deve estar no formato (XX) XXXXX-XXXX'),

    body('area')
        .exists({ checkFalsy: true })
        .withMessage('A área de interesse é obrigatória')
        .bail()
        .trim()
        .isIn(areasCandidatura)
        .withMessage('A área deve ser Recepção, Acervo ou Eventos'),

    body('disponibilidade')
        .exists({ checkFalsy: true })
        .withMessage('A disponibilidade é obrigatória')
        .bail()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('A disponibilidade deve ter entre 3 e 100 caracteres'),

    body('status')
        .optional()
        .isIn(statusCandidatura)
        .withMessage('O status deve ser Pendente, Aprovada ou Em análise'),

    body('ativo')
        .optional()
        .isBoolean()
        .withMessage('O campo ativo deve ser true ou false')

]

module.exports = { validarCandidatura }
