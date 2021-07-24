const { render } = require('ejs');
const { response } = require('express');
const express = require('express');

// importando e usando o router 
const router = express.Router();

const Checklist = require('../models/checklist');

//criando função get(requisição) de uma rota 
router.get('/', async (req, res) => {

    try {
       let checklists = await Checklist.find({});
       res.status(200).render('checklists/index', { checklists: checklists});//render com variavel com a listagem de checklist
    } catch (error) {
        res.status(200).render('pages/error', {error: 'erro ao exibir'});
    }
})

router.get('/new', async(req, res) => { 
    try {
        let checklist = new Checklist();
        res.status(200).render('checklists/new', { checklist: checklist });
    } catch (error) {
        res.status(500).render('pages/error', {errors: 'Não foi possivel criar nova checklist' });
    }
})

router.get('/:id/edit', async(req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', { checklist: checklist }).json();
      } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao exibir a edição Listas de tarefas'});
      }
  })

//criando uma funçao post de uma rota
router.post('/', async (req, res) => {
    let { name } = req.body.checklist;////estrair campo que precisa
    let checklist = new Checklist({name})
    try {
      //funcão para criar e mandar para o banco
     // let checklist = await Checklist.create({name});  
      await checklist.save()
        res.redirect('/checklists');
    } catch (error) {
        res.status(422).render('checklists/new', { checklist: {...checklist, error}})
    }
})

//esperando receber o id
router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id).populate('task');
        let task = { checklist: {...checklist.tasks}}
        res.json(checklist)
        res.status(200).render('checklists/show', { checklist: checklist, task: task});
    } catch (error) {
        res.status(200).render('pages/error', {error: 'erro ao exibir'} );
    }
})

//metodo para atualizar
router.put('/:id', async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = await Checklist.findById(req.params.id);
      try {
        await checklist.update({name});
        res.redirect('/checklists');
    } catch (error) {
        let errors = error.errors;
        res.status(422).render('checklists/edit', {checklist: {...checklist, errors}});
    }
})


//metodo para delete
router.delete('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findByIdAndRemove(req.params.id);
        res.status(200).redirect('/checklists');
    } catch (error) {
        res.status(422).json(error);
        res.status(200).render('pages/error', {error: 'erro ao exibir'});
    }
})
//Exportar arquivo 
module.exports = router;