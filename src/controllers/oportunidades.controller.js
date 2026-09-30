const oportunidadesRepository = require("../repositories/oportunidades.repository");

async function listar(req, res, next) {
    try {
        const oportunidades = await oportunidadesRepository.listar()

        return res.json({
            total: oportunidades.length,
            dados: oportunidades
        })
    } catch (erro) {
        return next(erro)
    }
}

async function buscarPorId(req, res, next) {
    try {
        const id = Number(req.params.id)

        const oportunidade = await oportunidadesRepository.buscarPorId(id)

        if (!oportunidade) {
            return res.status(404).json({
                erro: 'Oportunidade não encontrada'
            })
        }

        return res.json(oportunidade)
    } catch (erro) {
        return next(erro)
    }
}

async function criar(req, res, next) {
    try {
        const oportunidade = await oportunidadesRepository.criar(req.body)

        return res.status(201).json({
            mensagem: 'Oportunidade cadastrada com sucesso',
            dados: oportunidade
        })
    } catch (erro) {
        return next(erro)
    }
}

async function atualizar(req, res, next) {
    try {
        const id = Number(req.params.id)

        const oportunidade = await oportunidadesRepository.atualizar(
            id,
            req.body
        )

        if (!oportunidade) {
            return res.status(404).json({
                erro: "Oportunidade não encontrada"
            })
        }

        return res.json({
            mensagem: "Oportunidade atualizada com sucesso",
            dados: oportunidade
        })
    } catch (erro) {
        return next(erro)
    }
}

async function excluir(req, res, next) {
    try {
        const id = Number(req.params.id)

        const oportunidade = await oportunidadesRepository.excluir(id)

        if (!oportunidade) {
            return res.status(404).json({
                erro: "Oportunidade não encontrada"
            })
        }

        return res.json({
            mensagem: "Oportunidade excluída com sucesso",
            dados: oportunidade
        })
    } catch (erro) {
        return next(erro)
    }
}

module.exports = {listar, buscarPorId, criar, atualizar, excluir}