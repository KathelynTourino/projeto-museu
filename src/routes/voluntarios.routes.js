// routes/voluntarios.routes.js
const express = require('express');
const controller = require('../controllers/voluntarios.controller');

const router = express.Router();

// Prefixo /api/voluntarios é definido no app.js
router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.remover);

module.exports = router;