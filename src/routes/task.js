const express = require('express');
const checklistDependetRoute = express.Router();
const Checklist = require('../models/checklist');
const Task = require('../models/task');
const simpleRouter = express.Router();


checklistDependetRoute.get('/:id/tasks/new', async (req, res) => {
    try {
        let task = new Task();
        res.status(200).render('tasks/new', { checklistId: req.params.id, task: task})
    } catch (error) {
        res.status(422).render('pages/error', {error: 'Erro ao carregar o formulario'})
    }
})

simpleRouter.delete('/:id', async(req, res) =>{
    try {
        let task = await Task.findByIdAndRemove(req.params.id);
        let checklist = await Checklist.findById(task.checklist);
        let taskToRemove = checklist.tasks.indexOf(task._id)
        checklist.tasks.slice(taskToRemove, 1);
        checklist.save();
        res.redirect(`/checklists/${checklist._id}`);
    } catch (error) {
        res.status(422).render('pages/error', {error: 'Erro ao remover uma tarefa'})
    }
});

checklistDependetRoute.post('/:id/tasks', async (req, res) =>{
    let { name } = req.body.task;
    let task = new Task( { name, checklist: req.params.id});
    try {
        await task.save();
        let checklist = await Checklist.findById(req.params.id);
        checklist.tasks.push(task);
        await checklist.save();
        res.json(checklist)
        res.redirect(`/checklists/${req.params.id}`)
    } catch (error) {
        let errors = error.errors;
        res.status(422).render('tasks/new', {task: { ...task, errors }, checklist: req.params.id})
    }
})


module.exports = { checklistDepedent: checklistDependetRoute, simple: simpleRouter };