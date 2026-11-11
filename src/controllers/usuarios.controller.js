const bcrypt = require("bcrypt")
const usuariosRepository = require("../repositories/usuarios.repository")

const SALT_ROUNDS = 10

// Nunca devolve o hash da senha nas respostas
function semSenha(usuario) {
    const { senha, ...dadosPublicos } = usuario
    return dadosPublicos
}

// GET /api/usuarios
async function listar(req, res, next) {
    try {
        const usuarios = await usuariosRepository.listar()

        return res.json({
            total: usuarios.length,
            dados: usuarios.map(semSenha)
        })
    } catch (erro) {
        return next(erro)
    }
}

// GET /api/usuarios/:cpf
async function buscarPorCpf(req, res, next) {
    try {
        const cpf = req.params.cpf

        const usuario = await usuariosRepository.buscarPorCpf(cpf)

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            })
        }

        return res.json(semSenha(usuario))
    } catch (erro) {
        return next(erro)
    }
}

// POST /api/usuarios
async function criar(req, res, next) {
    try {
        const dados = req.body

        const cpf = dados.cpf

        // Verifica se o CPF já existe
        const usuarioCpf =
            await usuariosRepository.buscarPorCpf(cpf)

        if (usuarioCpf) {
            return res.status(409).json({
                erro: "Já existe um usuário com este CPF"
            })
        }

        // Verifica se o e-mail já existe
        const usuarioEmail =
            await usuariosRepository.buscarPorEmail(dados.email)

        if (usuarioEmail) {
            return res.status(409).json({
                erro: "Já existe um usuário com este e-mail"
            })
        }

        // Criptografa a senha antes de salvar
        const senhaHash = await bcrypt.hash(
            dados.senha,
            SALT_ROUNDS
        )

        const usuario = await usuariosRepository.criar({
            cpf: dados.cpf,
            nome: dados.nome.trim(),
            email: dados.email.trim().toLowerCase(),
            senha: senhaHash,
            telefone: dados.telefone || "",
            tipo_usuario: dados.tipo_usuario
        })

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso",
            dados: semSenha(usuario)
        })
    } catch (erro) {
        return next(erro)
    }
}

// PUT /api/usuarios/:cpf
async function atualizar(req, res, next) {
    try {
        const cpf = req.params.cpf

        const existente =
            await usuariosRepository.buscarPorCpf(cpf)

        if (!existente) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            })
        }

        const dados = req.body

        // Verifica se o novo e-mail já pertence a outro usuário
        const usuarioEmail =
            await usuariosRepository.buscarPorEmail(dados.email)

        if (usuarioEmail && usuarioEmail.cpf !== cpf) {
            return res.status(409).json({
                erro: "Já existe um usuário com este e-mail"
            })
        }

        // Mantém a senha antiga se uma nova não for enviada
        let senha = existente.senha

        if (dados.senha) {
            senha = await bcrypt.hash(
                dados.senha,
                SALT_ROUNDS
            )
        }

        const usuario =
            await usuariosRepository.atualizar(cpf, {
                nome: dados.nome.trim(),
                email: dados.email.trim().toLowerCase(),
                senha: senha,
                telefone: dados.telefone || "",
                tipo_usuario: dados.tipo_usuario
            })

        return res.json({
            mensagem: "Usuário atualizado com sucesso",
            dados: semSenha(usuario)
        })
    } catch (erro) {
        return next(erro)
    }
}

// DELETE /api/usuarios/:cpf
async function excluir(req, res, next) {
    try {
        const cpf = req.params.cpf

        const usuario =
            await usuariosRepository.excluir(cpf)

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            })
        }

        return res.json({
            mensagem: "Usuário excluído com sucesso",
            dados: semSenha(usuario)
        })
    } catch (erro) {
        return next(erro)
    }
}

module.exports = {
    listar,
    buscarPorCpf,
    criar,
    atualizar,
    excluir
}