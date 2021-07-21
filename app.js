const express = require('express');
const path = require('path');
//import arquivo
const checkListRouter = require('./src/routes/checklist');
const rootRouter = require('./src/routes/index');
require('./config/database');

//chama o express
const app = express();

//criar views 
app.set('views' , path.join(__dirname, 'src/views'));
//setando qual é a engine das views
app.set('view engine', 'ejs');

//usar middewares, parametro com express
app.use(express.json());

//importando como se fosse middeware
app.use('/checklists', checkListRouter);
app.use('/', rootRouter);


//Start port 3000
app.listen(3000, () =>{
    console.log('Servidor iniciado')
})