const express = require('express')
const router = express.Router()

const oportunidadesController = require('../controllers/oportunidades.controller')

router.get('/', oportunidadesController.listar)
router.get('/:id', oportunidadesController.buscarPorId)
router.post('/', oportunidadesController.criar)
router.put('/:id', oportunidadesController.atualizar)
router.delete('/:id', oportunidadesController.excluir)

module.exports = router