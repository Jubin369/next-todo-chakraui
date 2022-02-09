const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Please add a id']
    },
    body: {
        type: String,
        required: [true, 'Please add a title'],
        maxlength: [40, 'Title cannot be more than 40 characters']
    }
})

module.exports = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);