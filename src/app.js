const express = require("express");

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
    res.status(200).json({
        mensagem: "API do Museu funcionando"
    });
});

const oportunidadesRoutes = require('./routes/oportunidades.routes')

app.use('/api/oportunidades', oportunidadesRoutes)

app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada'
    });
});


module.exports = app;