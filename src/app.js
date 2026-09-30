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


module.exports = app;