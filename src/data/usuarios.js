// data/usuarios.js
// "Banco" em memória dos usuários do museu.
// O repository altera este mesmo array, então os dados ficam salvos
// enquanto o servidor estiver rodando.
//
// Os CPFs são fictícios, mas válidos nos dígitos verificadores.
// A senha de todos os usuários de teste é Museu@123, guardada em hash bcrypt.
// Use só para desenvolvimento. Nunca guarde senha em texto puro.

const usuarios = [
    {
        cpf: "52998224725",
        nome: "Mariana Alves",
        email: "mariana.alves@email.com",
        senha: "$2b$10$TUEbKYbd5xkjBQKEQW3g0.IEmUNv0E.mDmQGrwn/04mSbcJ/h0Viu",
        telefone: "(11) 91234-5678",
        tipo_usuario: "voluntario"
    },
    {
        cpf: "11144477735",
        nome: "Carlos Eduardo Lima",
        email: "carlos.lima@email.com",
        senha: "$2b$10$.hp7salLFKzTJW4clCxbQ.Z4TqDLQwn63emuZ5TBhMTyh9BC7OjTi",
        telefone: "(11) 98765-4321",
        tipo_usuario: "voluntario"
    },
    {
        cpf: "39053344705",
        nome: "Beatriz Souza",
        email: "beatriz.souza@email.com",
        senha: "$2b$10$rYAqeNbwe7EBNFzO5Kggqeq6tAeVInJ7fCSQB.5pVqe9loMa7r4dq",
        telefone: "(19) 99876-1122",
        tipo_usuario: "voluntario"
    },
    {
        cpf: "16899535009",
        nome: "Rafael Torres",
        email: "rafael.torres@email.com",
        senha: "$2b$10$nZuzNVgudRCQWi8sfvQL6OIcAAtyVYFsrAvULhzt6mr.v61nwMTgK",
        telefone: "(11) 97654-3210",
        tipo_usuario: "voluntario"
    },
    {
        cpf: "93541134780",
        nome: "Helena Martins",
        email: "helena.martins@email.com",
        senha: "$2b$10$Qm9.gqc0u4Zy5PwKn8Yfe.uM7V1v5zH6M1i2XYTalwO3Rd1uZUCQK",
        telefone: "(11) 99111-2233",
        tipo_usuario: "responsavel"
    }
];

module.exports = usuarios;