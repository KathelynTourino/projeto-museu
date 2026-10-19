// controllers/usuarios.controller.js
const bcrypt = require("bcrypt")
const usuariosRepository = require("../repositories/usuarios.repository")

// Valores aceitos em tipo_usuario. Ajuste conforme o que o grupo definiu
const TIPOS_USUARIO = ["voluntario", "responsavel"]
const SALT_ROUNDS = 10
const SENHA_MINIMA = 6

// ---------- funções auxiliares ----------

// Confere os dois dígitos verificadores do CPF
function cpfValido(cpf) {
    // 11 números e não pode ser repetido, tipo 111.111.111-11
    if (!/^\d{11}$/.test(cpf) || /^(\d)\1{10}$/.test(cpf)) {
        return false
    }

    const calcularDigito = (base) => {
        const soma = base
            .split("")
            .reduce((total, numero, i) => total + Number(numero) * (base.length + 1 - i), 0)
        const resto = (soma * 10) % 11
        return resto === 10 ? 0 : resto
    }

    return (
        calcularDigito(cpf.slice(0, 9)) === Number(cpf[9]) &&
        calcularDigito(cpf.slice(0, 10)) === Number(cpf[10])
    )
}

// Tira pontos e traço e devolve só os números do CPF, ou null se for inválido
function lerCpf(valor) {
    if (typeof valor !== "string") {
        return null
    }

    const cpf = valor.replace(/\D/g, "")
    return cpfValido(cpf) ? cpf : null
}

// Valida o corpo da requisição e devolve a lista de erros, vazia se estiver tudo certo
// criando = true no POST, onde cpf e senha são obrigatórios
// criando = false no PUT, onde o cpf vem pela URL e a senha só é validada se for enviada
function validar(dados, criando) {
    const erros = []

    if (criando && lerCpf(dados.cpf) === null) {
        erros.push('O campo "cpf" é obrigatório e deve ser um CPF válido.')
    }

    if (typeof dados.nome !== "string" || dados.nome.trim() === "") {
        erros.push('O campo "nome" é obrigatório.')
    }

    if (
        typeof dados.email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email.trim())
    ) {
        erros.push('O campo "email" é obrigatório e deve ser válido.')
    }

    if (criando || dados.senha !== undefined) {
        if (typeof dados.senha !== "string" || dados.senha.length < SENHA_MINIMA) {
            erros.push(`O campo "senha" é obrigatório e deve ter pelo menos ${SENHA_MINIMA} caracteres.`)
        }
    }

    if (dados.telefone !== undefined && typeof dados.telefone !== "string") {
        erros.push('O campo "telefone" deve ser um texto.')
    }

    if (!TIPOS_USUARIO.includes(dados.tipo_usuario)) {
        erros.push(
            `O campo "tipo_usuario" é obrigatório e deve ser um destes valores: ${TIPOS_USUARIO.join(", ")}.`
        )
    }

    return erros
}

// Monta o objeto do usuário só com os campos permitidos, sem cpf e sem senha
function montar(dados) {
    return {
        nome: dados.nome.trim(),
        email: dados.email.trim().toLowerCase(),
        telefone: (dados.telefone || "").trim(),
        tipo_usuario: dados.tipo_usuario
    }
}

// Nunca devolve o hash da senha nas respostas
function semSenha(usuario) {
    const { senha, ...dadosPublicos } = usuario
    return dadosPublicos
}

// ---------- handlers ----------

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
        const cpf = lerCpf(req.params.cpf)

        if (cpf === null) {
            return res.status(400).json({
                erro: "CPF inválido"
            })
        }

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
        const dados = req.body || {}

        const erros = validar(dados, true)
        if (erros.length > 0) {
            return res.status(400).json({
                erro: "Dados inválidos",
                detalhes: erros
            })
        }

        const cpf = lerCpf(dados.cpf)
        const novosDados = montar(dados)

        if (await usuariosRepository.buscarPorCpf(cpf)) {
            return res.status(409).json({
                erro: "Já existe um usuário com este CPF"
            })
        }

        if (await usuariosRepository.buscarPorEmail(novosDados.email)) {
            return res.status(409).json({
                erro: "Já existe um usuário com este e-mail"
            })
        }

        const senhaHash = await bcrypt.hash(dados.senha, SALT_ROUNDS)

        const usuario = await usuariosRepository.criar({
            cpf,
            ...novosDados,
            senha: senhaHash
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
// O cpf não muda, porque é a chave e outras tabelas apontam para ele
// Se a senha não for enviada, a atual é mantida
async function atualizar(req, res, next) {
    try {
        const cpf = lerCpf(req.params.cpf)

        if (cpf === null) {
            return res.status(400).json({
                erro: "CPF inválido"
            })
        }

        const existente = await usuariosRepository.buscarPorCpf(cpf)

        if (!existente) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            })
        }

        const dados = req.body || {}

        const erros = validar(dados, false)
        if (erros.length > 0) {
            return res.status(400).json({
                erro: "Dados inválidos",
                detalhes: erros
            })
        }

        const novosDados = montar(dados)

        const comMesmoEmail = await usuariosRepository.buscarPorEmail(novosDados.email)
        if (comMesmoEmail && comMesmoEmail.cpf !== cpf) {
            return res.status(409).json({
                erro: "Já existe um usuário com este e-mail"
            })
        }

        novosDados.senha =
            dados.senha !== undefined
                ? await bcrypt.hash(dados.senha, SALT_ROUNDS)
                : existente.senha

        const usuario = await usuariosRepository.atualizar(cpf, novosDados)

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
        const cpf = lerCpf(req.params.cpf)

        if (cpf === null) {
            return res.status(400).json({
                erro: "CPF inválido"
            })
        }

        const usuario = await usuariosRepository.excluir(cpf)

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

module.exports = { listar, buscarPorCpf, criar, atualizar, excluir }