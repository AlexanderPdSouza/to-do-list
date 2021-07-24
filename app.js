const express = require('express');
const path = require('path');
//import arquivo
const checkListRouter = require('./src/routes/checklist');
const taskRouter = require('./src/routes/task');
const rootRouter = require('./src/routes/index');
const methodOverride = require('method-override'); // method para put/delet

require('./config/database');


//chama o express
const app = express();

//criar views 
app.set('views' , path.join(__dirname, 'src/views'));
//setando qual é a engine das views
app.set('view engine', 'ejs');
//chama o methodOverride 
app.use(methodOverride('_method', { methods: ['POST', 'GET']}));

//usar middewares, parametro com express
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//habilitar o express para utilizar  arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//importando como se fosse middeware
app.use('/checklists', checkListRouter);
app.use('/', rootRouter);
app.use('/checklists', taskRouter.checklistDepedent);
app.use('/tasks', taskRouter.simple);

//Start port 3000
app.listen(3000, () =>{
    console.log('Servidor iniciado')
})