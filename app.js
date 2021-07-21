const express = require('express');
//import arquivo
const checkListRouter = require('./src/routes/checklist');
require('./config/database');
//chama o express
const app = express();

//usar middewares, parametro com expre
app.use(express.json());

//usando como se fosse um middeware
app.use('/checklists', checkListRouter);


//Start port 3000
app.listen(3000, () =>{
    console.log('Servidor iniciado')
})