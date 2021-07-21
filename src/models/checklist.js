const mongoose = require('mongoose');

//criar modelo para o banco
const checklistSchema = mongoose.Schema({
    name: {type: String, required: true},
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

module.exports = mongoose.model('checklist', checklistSchema);