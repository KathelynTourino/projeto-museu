const express = require('express')
const router = express.Router()

const usuariosController = require('../controllers/usuarios.controller')
const { validarUsuario } = require('../validators/usuarios.validator')
const validarResultado = require('../middleware/validarResultado')

// Prefixo /api/usuarios é definido no app.js
// O identificador do usuário é o CPF, por isso o parâmetro se chama :cpf

router.get('/', usuariosController.listar)
router.get('/:cpf', usuariosController.buscarPorCpf)
router.post('/', validarUsuario, validarResultado, usuariosController.criar)
router.put('/:cpf', validarUsuario, validarResultado, usuariosController.atualizar)
router.delete('/:cpf', usuariosController.excluir)

module.exports = router

