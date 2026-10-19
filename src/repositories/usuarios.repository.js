const usuarios = require("../data/usuarios")

function listar() {
    return usuarios
}

// O identificador do usuário é o CPF, guardado como texto
function buscarPorCpf(cpf) {
    return usuarios.find(usuario => usuario.cpf === String(cpf)) || null
}

// Compara sem diferenciar maiúsculas de minúsculas
function buscarPorEmail(email) {
    const emailBuscado = String(email).trim().toLowerCase()

    return usuarios.find(
        usuario => usuario.email.toLowerCase() === emailBuscado
    ) || null
}

function criar(dadosUsuario) {
    const novoUsuario = {
        cpf: dadosUsuario.cpf,
        nome: dadosUsuario.nome,
        email: dadosUsuario.email,
        senha: dadosUsuario.senha,
        telefone: dadosUsuario.telefone,
        tipo_usuario: dadosUsuario.tipo_usuario
    }

    usuarios.push(novoUsuario)

    return novoUsuario
}

function atualizar(cpf, dadosUsuario) {
    const indice = usuarios.findIndex(
        usuario => usuario.cpf === String(cpf)
    )

    if (indice === -1) {
        return null
    }

    usuarios[indice] = {
        cpf: String(cpf),
        nome: dadosUsuario.nome,
        email: dadosUsuario.email,
        senha: dadosUsuario.senha,
        telefone: dadosUsuario.telefone,
        tipo_usuario: dadosUsuario.tipo_usuario
    }

    return usuarios[indice]
}

function excluir(cpf) {
    const indice = usuarios.findIndex(
        usuario => usuario.cpf === String(cpf)
    )

    if (indice === -1) {
        return null
    }

    const usuarioExcluido = usuarios[indice]

    usuarios.splice(indice, 1)

    return usuarioExcluido
}

module.exports = { listar, buscarPorCpf, buscarPorEmail, criar, atualizar, excluir }