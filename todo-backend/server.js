const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

// Middlewares — must come AFTER app = express()
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoapp')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});

const todoModel = mongoose.model('Todo', todoSchema);

// Create Todo
app.post('/todos', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTodo = new todoModel({ title, description });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

// Get Todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await todoModel.find();
        res.json(todos);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

// Update Todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { title, description } = req.body;
        const id = req.params.id;

        const updatedTodo = await todoModel.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(updatedTodo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

// Delete Todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTodo = await todoModel.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
