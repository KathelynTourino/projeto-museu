candidaturas.controller

const candidaturasRepository = require('../repositories/candidaturas.repository')

async function listar(req, res, next) {
    try {
        const candidaturas = await candidaturasRepository.listar()

        return res.json({
            total: candidaturas.length,
            dados: candidaturas
        })
    } catch (erro) {
        return next(erro)
    }
}

async function buscarPorId(req, res, next) {
    try {
        const id = Number(req.params.id)
        const candidatura = await candidaturasRepository.buscarPorId(id)

        if (!candidatura) {
            return res.status(404).json({
                erro: 'Candidatura não encontrada'
            })
        }

        return res.json(candidatura)
    } catch (erro) {
        return next(erro)
    }
}

async function criar(req, res, next) {
    try {
        const candidatura = await candidaturasRepository.criar(req.body)

        return res.status(201).json({
            mensagem: 'Candidatura cadastrada com sucesso',
            dados: candidatura
        })
    } catch (erro) {
        return next(erro)
    }
}

async function remover(req, res, next) {
    try {
        const id = Number(req.params.id)
        const candidaturaRemovida = await candidaturasRepository.remover(id)

        if (!candidaturaRemovida) {
            return res.status(404).json({
                erro: 'Candidatura não encontrada'
            })
        }

        return res.status(204).send()
    } catch (erro) {
        return next(erro)
    }
}

async function atualizar(req, res, next) {
    try {
        const id = Number(req.params.id)
        const candidatura = await candidaturasRepository.atualizar(
            id,
            req.body
        )

        if (!candidatura) {
            return res.status(404).json({
                erro: 'Candidatura não encontrada para a alteração'
            })
        }

        return res.json({
            mensagem: 'Candidatura atualizada com sucesso',
            dados: candidatura
        })
    } catch (erro) {
        return next(erro)
    }
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    remover,
    atualizar
}