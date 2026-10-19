const express = require('express')
const router = express.Router()

const oportunidadesController = require('../controllers/oportunidades.controller')
const { validarOportunidade } = require('../validators/oportunidade.validator')
const validarResultado = require('../middleware/validarResultado')

router.get('/', oportunidadesController.listar)
router.get('/:id', oportunidadesController.buscarPorId)
router.post('/', validarOportunidade, validarResultado, oportunidadesController.criar)
router.put('/:id', validarOportunidade, validarResultado, oportunidadesController.atualizar)
router.delete('/:id', oportunidadesController.excluir)

module.exports = router