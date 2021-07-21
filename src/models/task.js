const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {type: String, required: true},
    done: {type: Boolean, default: false},
    cheklist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'checklist',
        required: true
    }
})

module.exports = mongoose.model('task', taskSchema);