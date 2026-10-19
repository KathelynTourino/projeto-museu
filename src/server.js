const app = require("./app")

// Usa a porta definida no ambiente, se existir, ou a 3000
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})