
const { pool } = require("../data/candidaturas")

const consultaCandidatura = 'SELECT * FROM candidaturas'

function montarCandidatura(linha) {
    return {
        id: linha.id,
        cliente_id: linha.cliente_id,
        vaga: linha.vaga,
        descricao: linha.descricao,
        data_candidatura: linha.data_candidatura,
        status: linha.status,
        observacoes: linha.observacoes,
        criado_em: linha.criado_em,
        atualizado_em: linha.atualizado_em
    }
}

async function listar() {
    const [linhas] = await pool.query(consultaCandidatura)
    return linhas.map(montarCandidatura)
}

async function buscarPorId(id) {
    const [linhas] = await pool.query(
        `${consultaCandidatura} WHERE id = ?`,
        [id]
    )

    if (linhas.length === 0) {
        return null
    }

    return montarCandidatura(linhas[0])
}

async function criar(dadosCandidatura) {
    const candidatura = {
        cliente_id: dadosCandidatura.cliente_id,
        vaga: dadosCandidatura.vaga,
        descricao: dadosCandidatura.descricao ?? null,
        data_candidatura: dadosCandidatura.data_candidatura ?? new Date(),
        status: dadosCandidatura.status ?? 'Pendente',
        observacoes: dadosCandidatura.observacoes ?? null
    }

    const sql = 'INSERT INTO candidaturas SET ?'
    const [resultado] = await pool.query(sql, [candidatura])

    return buscarPorId(resultado.insertId)
}

async function atualizar(id, dadosCandidatura) {
    const conexao = await pool.getConnection()

    try {
        await conexao.beginTransaction()

        const [resultadoCandidatura] = await conexao.execute(
            `UPDATE candidaturas
             SET cliente_id = ?, vaga = ?, descricao = ?,
                 data_candidatura = ?, status = ?, observacoes = ?
             WHERE id = ?`,
            [
                dadosCandidatura.cliente_id,
                dadosCandidatura.vaga,
                dadosCandidatura.descricao ?? null,
                dadosCandidatura.data_candidatura,
                dadosCandidatura.status,
                dadosCandidatura.observacoes ?? null,
                id
            ]
        )

        if (resultadoCandidatura.affectedRows === 0) {
            await conexao.rollback()
            return null
        }

        await conexao.commit()
        return buscarPorId(id)
    } catch (erro) {
        await conexao.rollback()
        throw erro
    } finally {
        conexao.release()
    }
}

async function remover(id) {
    const [resultado] = await pool.execute(
        'DELETE FROM candidaturas WHERE id = ?',
        [id]
    )

    return resultado.affectedRows > 0
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    remover
}
