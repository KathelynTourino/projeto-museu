const express = require('express')
const router = express.Router()

const controller = require('../controllers/candidaturas.controller')
const { validarCandidatura } = require('../validators/candidaturas.validator')
const validarResultado = require('../middleware/validarResultado')

router.get('/', controller.listar)
router.get('/:id', controller.buscarPorId)
router.post('/', validarCandidatura, validarResultado, controller.criar)
router.put('/:id', validarCandidatura, validarResultado, controller.atualizar)
router.delete('/:id', controller.excluir)

module.exports = router
