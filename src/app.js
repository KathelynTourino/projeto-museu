const express = require("express")

const app = express()

app.use(express.json())

app.get("/api", (req, res) => {
    res.status(200).json({
        mensagem: "API do Museu funcionando"
    })
})

const oportunidadesRoutes = require("./routes/oportunidades.routes")
const voluntariosRoutes = require("./routes/voluntarios.routes")
const usuariosRoutes = require("./routes/usuarios.routes")
const candidaturasRoutes = require("./routes/candidaturas.routes")

app.use("/api/oportunidades", oportunidadesRoutes)
app.use("/api/voluntarios", voluntariosRoutes)
app.use("/api/usuarios", usuariosRoutes)
app.use("/api/candidaturas", candidaturasRoutes)

app.use((req, res) => {
    res.status(404).json({
        erro: "Rota não encontrada"
    })
})

app.use((erro, req, res, next) => {
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