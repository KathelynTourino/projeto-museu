const oportunidades = require("../data/oportunidades");

function listar() {
    return oportunidades
}

function buscarPorId(id) {
    return oportunidades.find(oportunidade => oportunidade.id === Number(id)) || null
}

function criar(dadosOportunidade) {
    const novaOportunidade = {
        id: oportunidades.length + 1,
        titulo: dadosOportunidade.titulo,
        descricao: dadosOportunidade.descricao,
        tipo: dadosOportunidade.tipo,
        data: dadosOportunidade.data,
        local: dadosOportunidade.local,
        horario: dadosOportunidade.horario,
        status: dadosOportunidade.status || 'aberta'
    }

    oportunidades.push(novaOportunidade)

    return novaOportunidade
}

function atualizar(id, dadosOportunidade) {
    const indice = oportunidades.findIndex(
        oportunidade => oportunidade.id === Number(id)
    )

    if (indice === -1) {
        return null
    }

    oportunidades[indice] = {
        id: Number(id),
        titulo: dadosOportunidade.titulo,
        descricao: dadosOportunidade.descricao,
        tipo: dadosOportunidade.tipo,
        data: dadosOportunidade.data,
        local: dadosOportunidade.local,
        horario: dadosOportunidade.horario,
        status: dadosOportunidade.status
    }

    return oportunidades[indice]
}

function excluir(id) {
    const indice = oportunidades.findIndex(
        oportunidade => oportunidade.id === Number(id)
    )

    if (indice === -1) {
        return null
    }

    const oportunidadeExcluida = oportunidades[indice]

    oportunidades.splice(indice, 1)

    return oportunidadeExcluida
}

module.exports = { listar, buscarPorId, criar, atualizar, excluir}