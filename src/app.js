const express = require("express")

const app = express()

// ---------- configuração geral ----------

// Faz o Express ler o corpo das requisições em JSON e guardar em req.body
app.use(express.json())

// ---------- rotas ----------

app.get("/api", (req, res) => {
    res.status(200).json({
        mensagem: "API do Museu funcionando"
    })
})

const oportunidadesRoutes = require("./routes/oportunidades.routes")
const voluntariosRoutes = require("./routes/voluntarios.routes")
const usuariosRoutes = require("./routes/usuarios.routes")

app.use("/api/oportunidades", oportunidadesRoutes)
app.use("/api/voluntarios", voluntariosRoutes)
app.use("/api/usuarios", usuariosRoutes)

// ---------- rota inexistente e erros ----------
// Estes dois precisam ficar depois de todas as rotas,
// porque o Express lê o arquivo de cima para baixo e para na primeira resposta

// Qualquer endereço que nenhuma rota acima atendeu cai aqui
app.use((req, res) => {
    res.status(404).json({
        erro: "Rota não encontrada"
    })
})

// Recebe os erros enviados com next(erro) nos controllers
// O Express só reconhece como tratador de erros a função com 4 parâmetros
app.use((erro, req, res, next) => {
    // JSON com sintaxe errada no corpo da requisição
    if (erro.type === "entity.parse.failed") {
        return res.status(400).json({
            erro: "JSON inválido no corpo da requisição"
        })
    }

    console.error(erro)

    return res.status(500).json({
        erro: "Erro interno do servidor"
    })
})

module.exports = app