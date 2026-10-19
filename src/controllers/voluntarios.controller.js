// controllers/voluntarios.controller.js
const voluntarios = require('../data/voluntarios');

// ---------- funções auxiliares ----------

function proximoId() {
  return voluntarios.length ? Math.max(...voluntarios.map((v) => v.id)) + 1 : 1;
}

// Converte o :id da URL em número inteiro positivo (ou null se for inválido)
function lerId(valor) {
  const id = Number(valor);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function emailEmUso(email, ignorarId = null) {
  const alvo = email.trim().toLowerCase();
  return voluntarios.some(
    (v) => v.email.toLowerCase() === alvo && v.id !== ignorarId
  );
}

// Valida o corpo da requisição. Retorna uma lista de erros (vazia = tudo certo)
function validar(dados) {
  const erros = [];

  if (typeof dados.nome !== 'string' || dados.nome.trim() === '') {
    erros.push('O campo "nome" é obrigatório.');
  }

  if (
    typeof dados.email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email.trim())
  ) {
    erros.push('O campo "email" é obrigatório e deve ser válido.');
  }

  ['telefone', 'area', 'disponibilidade'].forEach((campo) => {
    if (dados[campo] !== undefined && typeof dados[campo] !== 'string') {
      erros.push(`O campo "${campo}" deve ser um texto.`);
    }
  });

  if (dados.ativo !== undefined && typeof dados.ativo !== 'boolean') {
    erros.push('O campo "ativo" deve ser true ou false.');
  }

  return erros;
}

// Monta o objeto do voluntário só com os campos permitidos
function montar(dados) {
  return {
    nome: dados.nome.trim(),
    email: dados.email.trim(),
    telefone: (dados.telefone || '').trim(),
    area: (dados.area || '').trim(),
    disponibilidade: (dados.disponibilidade || '').trim(),
    ativo: dados.ativo === undefined ? true : dados.ativo,
  };
}

// ---------- handlers ----------

// GET /api/voluntarios
function listar(req, res) {
  return res.status(200).json(voluntarios);
}

// GET /api/voluntarios/:id
function buscarPorId(req, res) {
  const id = lerId(req.params.id);
  if (id === null) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }

  const voluntario = voluntarios.find((v) => v.id === id);
  if (!voluntario) {
    return res.status(404).json({ erro: 'Voluntário não encontrado.' });
  }

  return res.status(200).json(voluntario);
}

// POST /api/voluntarios
function criar(req, res) {
  const dados = req.body || {};

  const erros = validar(dados);
  if (erros.length > 0) {
    return res.status(400).json({ erro: 'Dados inválidos.', detalhes: erros });
  }

  if (emailEmUso(dados.email)) {
    return res.status(409).json({ erro: 'Já existe um voluntário com este e-mail.' });
  }

  const novo = { id: proximoId(), ...montar(dados) };
  voluntarios.push(novo);

  return res.status(201).json(novo);
}

// PUT /api/voluntarios/:id  (substitui os dados do voluntário)
function atualizar(req, res) {
  const id = lerId(req.params.id);
  if (id === null) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }

  const indice = voluntarios.findIndex((v) => v.id === id);
  if (indice === -1) {
    return res.status(404).json({ erro: 'Voluntário não encontrado.' });
  }

  const dados = req.body || {};

  const erros = validar(dados);
  if (erros.length > 0) {
    return res.status(400).json({ erro: 'Dados inválidos.', detalhes: erros });
  }

  if (emailEmUso(dados.email, id)) {
    return res.status(409).json({ erro: 'Já existe um voluntário com este e-mail.' });
  }

  voluntarios[indice] = { id, ...montar(dados) };

  return res.status(200).json(voluntarios[indice]);
}

// DELETE /api/voluntarios/:id
function remover(req, res) {
  const id = lerId(req.params.id);
  if (id === null) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }

  const indice = voluntarios.findIndex((v) => v.id === id);
  if (indice === -1) {
    return res.status(404).json({ erro: 'Voluntário não encontrado.' });
  }

  voluntarios.splice(indice, 1);

  return res.status(204).send();
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };