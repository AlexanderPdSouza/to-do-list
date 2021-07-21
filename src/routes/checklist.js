const express = require('express');
// importando e usando o router 
const router = express.Router();

//criando função get de uma rota 
router.get('/', (req, res) =>{
    console.log('Olá');
    res.send();
})
//criando uma funçao post de uma rota
router.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).send(req.body)
})
//esperando receber o id
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    res.send(`ID: ${req.params.id}`);
})
//metodo para atualizar
router.put('/:id', (req, res) => {
    console.log(req.params.id);
    res.send(`Put id: ${req.params.id}`);
})
//metodo para delete
router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    res.send(`Delete id: ${req.params.id}`);
})
//Exportar arquivo 
module.exports = router;