const { body } = require('express-validator')

const tiposOportunidade = [
    'mutirão',
    'evento',
    'digitalização',
    'apresentação',
    'organização',
    'estágio'
]

const statusOportunidade = [
    'aberta',
    'encerrada',
    'cancelada'
]

const validarOportunidade = [
     body('titulo')
    .exists({ checkFalsy: true })
    .withMessage('O título da oportunidade é obrigatório')
    .bail()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('O título deve ter entre 3 e 100 caracteres'),

     body('descricao')
    .exists({ checkFalsy: true })
    .withMessage('A descrição da oportunidade é obrigatória')
    .bail()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('A descrição deve ter entre 10 e 500 caracteres'),

    body('tipo')
    .exists({ checkFalsy: true })
    .withMessage('O tipo da oportunidade é obrigatório')
    .bail()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('O tipo deve ter entre 3 e 50 caracteres'),

    body('data')
    .exists({ checkFalsy: true })
    .withMessage('A data da oportunidade é obrigatória')
    .bail()
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage('Use uma data válida no formato AAAA-MM-DD'),

    body('local')
    .exists({ checkFalsy: true })
    .withMessage('O local da oportunidade é obrigatório')
    .bail()
    .trim()
    .isLength({ min: 3, max: 150 })
    .withMessage('O local deve ter entre 3 e 150 caracteres'),

    body('horario')
    .exists({ checkFalsy: true })
    .withMessage('O horário da oportunidade é obrigatório')
    .bail()
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/)
    .withMessage('O horário deve estar no formato HH:MM'),

    body('status')
    .optional()
    .isIn(['aberta', 'encerrada', 'cancelada'])
    .withMessage('O status deve ser aberta, encerrada ou cancelada')

]