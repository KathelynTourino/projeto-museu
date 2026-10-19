// data/voluntarios.js
// "Banco" em memória dos voluntários do museu.
// O controller altera este mesmo array (push, splice), então os dados
// ficam salvos enquanto o servidor estiver rodando.

const voluntarios = [
  {
    id: 1,
    nome: 'Mariana Alves',
    email: 'mariana.alves@email.com',
    telefone: '(11) 91234-5678',
    area: 'Monitoria',
    disponibilidade: 'Sábados, manhã',
    ativo: true,
  },
  {
    id: 2,
    nome: 'Carlos Eduardo Lima',
    email: 'carlos.lima@email.com',
    telefone: '(11) 98765-4321',
    area: 'Recepção',
    disponibilidade: 'Terças e quintas, tarde',
    ativo: true,
  },
  {
    id: 3,
    nome: 'Beatriz Souza',
    email: 'beatriz.souza@email.com',
    telefone: '(19) 99876-1122',
    area: 'Acervo',
    disponibilidade: 'Segundas, tarde',
    ativo: true,
  },
  {
    id: 4,
    nome: 'Rafael Torres',
    email: 'rafael.torres@email.com',
    telefone: '(11) 97654-3210',
    area: 'Eventos',
    disponibilidade: 'Domingos, dia todo',
    ativo: false,
  },
];

module.exports = voluntarios;