
const express = require('express')
const router = express.Router()

const controller = require('../controllers/voluntarios.controller')
const { validarVoluntario } = require('../validators/voluntarios.validator')
const validarResultado = require('../middleware/validarResultado')

// Prefixo /api/voluntarios é definido no app.js

router.get('/', controller.listar)
router.get('/:id', controller.buscarPorId)
router.post('/', validarVoluntario, validarResultado, controller.criar)
router.put('/:id', validarVoluntario, validarResultado, controller.atualizar)
router.delete('/:id', controller.remover)

module.exports = router
