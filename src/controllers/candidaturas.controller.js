const candidaturas = require('../data/candidaturas');

async function listar(req, res) {
    try {
        const resultado = await candidaturas.listar();
        res.json(resultado);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao listar candidaturas' });
    }
}

async function buscarPorId(req, res) {
    try {
        const resultado = await candidaturas.buscarPorId(req.params.id);

        if (!resultado) {
            return res.status(404).json({ erro: 'Candidatura não encontrada' });
        }

        res.json(resultado);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar candidatura' });
    }
}

async function criar(req, res) {
    try {
        const id = await candidaturas.criar(req.body);

        res.status(201).json({
            mensagem: 'Candidatura cadastrada com sucesso',
            id
        });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao cadastrar candidatura' });
    }
}

async function atualizar(req, res) {
    try {
        const resultado = await candidaturas.atualizar(
            req.params.id,
            req.body
        );

        if (!resultado) {
            return res.status(404).json({ erro: 'Candidatura não encontrada' });
        }

        res.json({ mensagem: 'Candidatura atualizada com sucesso' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao atualizar candidatura' });
    }
}

async function excluir(req, res) {
    try {
        const resultado = await candidaturas.excluir(req.params.id);

        if (!resultado) {
            return res.status(404).json({ erro: 'Candidatura não encontrada' });
        }

        res.json({ mensagem: 'Candidatura excluída com sucesso' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao excluir candidatura' });
    }
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
};