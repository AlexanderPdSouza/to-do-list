const express = require('express');
const checklist = require('../models/checklist');
// importando e usando o router 
const router = express.Router();

const Checklist = require('../models/checklist');

//criando função get(requisição) de uma rota 
router.get('/', async (req, res) => {

    try {
       let checklists = await Checklist.find({});
        res.status(200).json(checklists);
    } catch (error) {
        res.status(500).json(error);
    }
})

//criando uma funçao post de uma rota
router.post('/', async (req, res) => {
//estrair campo que precisa
    let { name } = req.body;
//funcão para criar e mandar para o banco
    try {
        let checklist = await Checklist.create({name}) ;
        res.status(200).json(checklist);
    } catch (error) {
        res.status(422).json(error)
    }
})
//esperando receber o id
router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).json(checklist);
    } catch (error) {
        res.status(422).json(error);
    }
})

//metodo para atualizar
router.put('/:id', async (req, res) => {
    let { name } = req.body
    try {
        let checklist = await Checklist.findByIdAndUpdate(req.params.id, {name}, {new: true} );
        res.status(200).json(checklist);
    } catch (error) {
        res.status(422).json(error);
    }
})
//metodo para delete
router.delete('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findByIdAndRemove(req.params.id);
        res.status(200).json(checklist);
    } catch (error) {
        res.status(422).json(error);
    }
})
//Exportar arquivo 
module.exports = router;