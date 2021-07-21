const express = require('express');

//chama o express
const app = express();

//usar middewares, parametro com expre
app.use(express.json());

//criar log com middewares
const log = (req, res, next) =>{
    console.log(req.body);
    console.log(`Data: ${Date.now()}`);
    next();
}

//usar o log
app.use(log);

//Setar as rotas
app.get('/', (req, res) =>{
    res.send('<h1>Minha lista de tarefa </h1> ');
})

//devolvendo resposta json 
app.get('/json', (req, res) =>{
    console.log(req.body);
    res.json({
        title: 'Tarefa X',
        done: true
    });
})

//Start port 3000
app.listen(3000, () =>{
    console.log('Servidor iniciado')
})