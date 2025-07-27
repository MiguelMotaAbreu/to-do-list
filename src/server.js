const express = require('express');
//Adicionando o cors, para evitar problemas com permissões de rotas e seus acessos
const cors = require('cors');

//Criando a instância do express, guardar seu valor ajuda a implementar mudanças significativas em server.js, como cors, que evita inconsistências e problemas com permissões de rotas em API
const app = express();
const PORT = 3001;

//Middlewares, antecipações aplicadas para melhor fluidez na interação das diferentes partes da API
app.use(cors());
app.use(express.json());

//Definindo rota teste, com intuito apenas de testar conexão.
//A lógica da rota segue com os parâmetros de "o que será na URL", "o que será solicitado por meio desta rota" e "o que será retornado".
app.get('/', (req, res) => {
    res.send('<h1>Task Manager API está funcionando!</h1>');
})
//Iniciando o servidor com mensagem no console para tornar o estado de funcionamento mais claro
app.listen(PORT, () => {
    console.log(`Servidor do Task Manager rodando em http://localhost:${PORT}`);
});