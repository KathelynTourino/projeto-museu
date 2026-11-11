
const { body } = require('express-validator')

const tiposUsuario = [
    'voluntario',
    'responsavel'
]

const validarUsuario = [

    body('cpf')
        .exists({ checkFalsy: true })
        .withMessage('O CPF é obrigatório')
        .bail()
        .trim()
        .matches(/^\d{11}$/)
        .withMessage('O CPF deve conter exatamente 11 números'),

    body('nome')
        .exists({ checkFalsy: true })
        .withMessage('O nome é obrigatório')
        .bail()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('O nome deve ter entre 3 e 100 caracteres'),

    body('email')
        .exists({ checkFalsy: true })
        .withMessage('O email é obrigatório')
        .bail()
        .trim()
        .isEmail()
        .withMessage('O email deve ser válido'),

    body('senha')
        .exists({ checkFalsy: true })
        .withMessage('A senha é obrigatória')
        .bail()
        .isLength({ min: 6, max: 100 })
        .withMessage('A senha deve ter entre 6 e 100 caracteres'),

    body('telefone')
        .exists({ checkFalsy: true })
        .withMessage('O telefone é obrigatório')
        .bail()
        .trim()
        .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/)
        .withMessage('O telefone deve estar no formato (XX) XXXXX-XXXX'),

    body('tipo_usuario')
        .exists({ checkFalsy: true })
        .withMessage('O tipo de usuário é obrigatório')
        .bail()
        .isIn(tiposUsuario)
        .withMessage('O tipo de usuário deve ser voluntario ou responsavel')

]

module.exports = { validarUsuario }
