const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// In-memory database
let todos = [];

// GET /todos - Retrieve all to-do items
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST /todos - Create a new to-do item
app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        text: req.body.text,
        completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT /todos/:id - Update a to-do item
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id === parseInt(id));

    if (!todo) {
        return res.status(404).json({ message: 'To-do item not found' });
    }

    todo.text = req.body.text !== undefined ? req.body.text : todo.text;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

    res.json(todo);
});

// DELETE /todos/:id - Delete a to-do item
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex(t => t.id === parseInt(id));

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'To-do item not found' });
    }

    todos.splice(todoIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
