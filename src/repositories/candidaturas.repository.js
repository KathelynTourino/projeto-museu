candidaturas.repository

const candidaturas = require('../data/candidaturas')

function listar() {
    return candidaturas
}

function buscarPorId(id) {
    return candidaturas.find(
        candidatura => candidatura.id === Number(id)
    ) || null
}

function criar(dadosCandidatura) {
    const novaCandidatura = {
        id: candidaturas.length > 0
            ? Math.max(...candidaturas.map(c => c.id)) + 1
            : 1,
        nome: dadosCandidatura.nome,
        email: dadosCandidatura.email,
        telefone: dadosCandidatura.telefone,
        area: dadosCandidatura.area,
        disponibilidade: dadosCandidatura.disponibilidade,
        ativo: dadosCandidatura.ativo ?? true
    }

    candidaturas.push(novaCandidatura)

    return novaCandidatura
}

function atualizar(id, dadosCandidatura) {
    const indice = candidaturas.findIndex(
        candidatura => candidatura.id === Number(id)
    )

    if (indice === -1) {
        return null
    }

    candidaturas[indice] = {
        id: Number(id),
        nome: dadosCandidatura.nome,
        email: dadosCandidatura.email,
        telefone: dadosCandidatura.telefone,
        area: dadosCandidatura.area,
        disponibilidade: dadosCandidatura.disponibilidade,
        ativo: dadosCandidatura.ativo ?? true
    }

    return candidaturas[indice]
}

function excluir(id) {
    const indice = candidaturas.findIndex(
        candidatura => candidatura.id === Number(id)
    )

    if (indice === -1) {
        return null
    }

    const candidaturaExcluida = candidaturas[indice]

    candidaturas.splice(indice, 1)

    return candidaturaExcluida
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
}