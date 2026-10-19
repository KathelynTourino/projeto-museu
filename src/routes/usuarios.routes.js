// routes/usuarios.routes.js
const express = require('express')
const router = express.Router()

const usuariosController = require('../controllers/usuarios.controller')

// Prefixo /api/usuarios é definido no app.js
// O identificador do usuário é o CPF, por isso o parâmetro se chama :cpf
router.get('/', usuariosController.listar)
router.get('/:cpf', usuariosController.buscarPorCpf)
router.post('/', usuariosController.criar)
router.put('/:cpf', usuariosController.atualizar)
router.delete('/:cpf', usuariosController.excluir)

module.exports = router